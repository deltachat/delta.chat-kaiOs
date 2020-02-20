import { h } from "preact";
import { MessageStatus } from "../mock/deltachat";
import { Icon } from "./icon";

import hourglass from '@fortawesome/fontawesome-free/svgs/regular/hourglass.svg'
import check from '@fortawesome/fontawesome-free/svgs/solid/check.svg'
import check_double from '@fortawesome/fontawesome-free/svgs/solid/check-double.svg'
import exclaimation from '@fortawesome/fontawesome-free/svgs/solid/exclamation-circle.svg'
import question_circle from '@fortawesome/fontawesome-free/svgs/solid/question-circle.svg'


type messageStatusProps = { status: MessageStatus, size: string }
export function MessageStatusIcon({ status, size }: messageStatusProps) {
    switch (status) {
        case MessageStatus.PENDING:
            return <Icon src={hourglass} size={size} color="darkgrey" />
        case MessageStatus.DELIVERED:
            return <Icon src={check} size={size} color="darkgrey" />
        case MessageStatus.READ:
            return <Icon src={check_double} size={size} color="green" />
        case MessageStatus.ERROR:
            return <Icon src={exclaimation} size={size} color="red" />
        default:
            return <Icon src={question_circle} size={size} color="darkgrey" />
    }
}