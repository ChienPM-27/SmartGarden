package com.sg.ddd.domain.service;

import com.sg.ddd.domain.model.entity.TicketDetail;

public interface TicketDetailDomainService {

    TicketDetail getTicketDetailById(Long ticketId);
}
