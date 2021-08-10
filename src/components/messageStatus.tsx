export function MessageStatusIcon({ status }: { status: number }) {
  switch (status) {
    case 18 /* MsgOutPreparing */:
    case 20 /* MsgOutPending */:
      return (
        <img src='../images/icons/sending.svg' class='status-icon sending' />
      )
    case 26 /* MsgOutDelivered */:
      return (
        <img src='../images/icons/sent.svg' class='status-icon delivered' />
      )
    case 28 /* MsgOutMdnRcvd */:
      return <img src='../images/icons/read.svg' class='status-icon read' />
    case 24 /* MsgOutFailed */:
      return <img src='../images/icons/error.svg' class='status-icon error' />
    default:
      return <span class='status-icon'></span>
  }
}
