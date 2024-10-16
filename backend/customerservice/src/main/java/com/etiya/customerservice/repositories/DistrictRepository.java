package com.etiya.customerservice.repositories;

import com.etiya.customerservice.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface DistrictRepository extends JpaRepository<District, Long>{
}
