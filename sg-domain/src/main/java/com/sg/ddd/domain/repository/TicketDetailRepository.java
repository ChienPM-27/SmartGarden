package com.sg.ddd.domain.repository;

import com.sg.ddd.domain.model.entity.TicketDetail;

import java.util.Optional;

public interface TicketDetailRepository {

    Optional<TicketDetail> findById(Long id);
}
