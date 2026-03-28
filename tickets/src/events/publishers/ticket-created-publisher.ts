import { Publisher, Subjects} from "@psrtickets/common"
import type { TicketCreatedEvent } from "@psrtickets/common"
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
   subject :Subjects.TicketCreated = Subjects.TicketCreated;
}


