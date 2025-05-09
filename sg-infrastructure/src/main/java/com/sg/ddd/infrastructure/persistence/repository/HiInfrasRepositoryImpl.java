package com.sg.ddd.infrastructure.persistence.repository;

import com.sg.ddd.domain.repository.HiDomainRepository;
import org.springframework.stereotype.Service;

@Service
public class HiInfrasRepositoryImpl implements HiDomainRepository {

    @Override
    public String sayHi(String who) {
        return "Hi Infrastructure" + who;
    }

}
