import { MessageStatus } from '../mock/deltachat'

export function MessageStatusIcon({ status }: { status: MessageStatus }) {
  switch (status) {
    case MessageStatus.PENDING:
      return (
        <img src='../images/icons/sending.svg' class='status-icon sending' />
      )
    case MessageStatus.DELIVERED:
      return (
        <img src='../images/icons/sent.svg' class='status-icon delivered' />
      )
    case MessageStatus.READ:
      return <img src='../images/icons/read.svg' class='status-icon read' />
    case MessageStatus.ERROR:
      return <img src='../images/icons/error.svg' class='status-icon error' />
    default:
      return <span class='status-icon'></span>
  }
}
