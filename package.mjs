import fs from 'fs/promises'

import AdmZip from 'adm-zip'
;(async () => {
  const version = JSON.parse(await fs.readFile("./package.json")).version


  await fs.mkdir('./build', {recursive:true})

  const inner_zip = new AdmZip()

  inner_zip.addLocalFolder('dist')

  const metadata = {
    version: 1.0,
    manifestURL: 'app://ui.kaios.delta.chat/manifest.webapp',
  }

  inner_zip.addLocalFolder('./res/icons', 'icons')
  
  await new Promise((res, rej)=>{
    inner_zip.writeZip(`./build/application.zip`, err => {
        if (!err) {
          res()
        } else {
          rej(err)
        }
      })
  })

  const zip = new AdmZip()
  zip.addFile('metadata.json', Buffer.from(JSON.stringify(metadata), 'utf8'))
  zip.addLocalFile('./build/application.zip')

  zip.writeZip(`./build/deltachat${version}.omnisd.zip`, err => {
    if (!err) {
      console.log('done')
    } else {
      console.log('error:', err)
      process.exit(1)
    }
  })
})()
