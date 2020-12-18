import { h } from 'preact'
import { MessageStatus } from '../mock/deltachat'
import { Icon } from './icon'

import hourglass from '@fortawesome/fontawesome-free/svgs/regular/hourglass.svg'
import check from '@fortawesome/fontawesome-free/svgs/solid/check.svg'
import check_double from '@fortawesome/fontawesome-free/svgs/solid/check-double.svg'
import exclaimation from '@fortawesome/fontawesome-free/svgs/solid/exclamation-circle.svg'
import question_circle from '@fortawesome/fontawesome-free/svgs/solid/question-circle.svg'

type messageStatusProps = { status: MessageStatus; size: string }
export function MessageStatusIcon({ status, size }: messageStatusProps) {
  switch (status) {
    case MessageStatus.PENDING:
      return <Icon svgReference={hourglass} size={size} color='darkgrey' />
    case MessageStatus.DELIVERED:
      return <Icon svgReference={check} size={size} color='darkgrey' />
    case MessageStatus.READ:
      return <Icon svgReference={check_double} size={size} color='green' />
    case MessageStatus.ERROR:
      return <Icon svgReference={exclaimation} size={size} color='red' />
    default:
      return (
        <Icon svgReference={question_circle} size={size} color='darkgrey' />
      )
  }
}
