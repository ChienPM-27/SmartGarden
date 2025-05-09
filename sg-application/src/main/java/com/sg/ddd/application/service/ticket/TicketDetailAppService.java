package com.sg.ddd.application.service.ticket;

import com.sg.ddd.domain.model.entity.TicketDetail;

public interface TicketDetailAppService {

    TicketDetail getTicketDetailById(Long ticketId); // should convert to TickDetailDTO by Application Module
}
