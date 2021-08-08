import { MessageStatus } from '../mock/deltachat'

export function MessageStatusIcon({ status }: { status: MessageStatus }) {
  switch (status) {
    case MessageStatus.PENDING:
      return <span class="status-icon sending"></span>
    case MessageStatus.DELIVERED:
      return <span class="status-icon delivered"></span>
    case MessageStatus.READ:
      return <span class="status-icon read"></span>
    case MessageStatus.ERROR:
      return <span class="status-icon error"></span>
    default:
      return (
        <span class="status-icon"></span>
      )
  }
}
