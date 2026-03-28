import { Publisher, Subjects} from "@psrtickets/common"
import type { TicketUpdatedEvent } from "@psrtickets/common"
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
   subject :Subjects.TicketUpdated = Subjects.TicketUpdated;
}


