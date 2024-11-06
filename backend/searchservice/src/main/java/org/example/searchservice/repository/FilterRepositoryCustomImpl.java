package org.example.searchservice.repository;

import org.example.searchservice.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;

public class FilterRepositoryCustomImpl implements FilterRepositoryCustom{
    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public Page<Customer> searchResult(
            String nationalityId, String id, String mobilePhone, String accountNumber,
            String firstName, String middleName, String lastName, String sortField,
            String sortOrder, Pageable pageable) {

        List<Criteria> criteriaList = new ArrayList<>();

        if (nationalityId != null) {
            criteriaList.add(Criteria.where("nationalityId").regex(nationalityId, "i"));
        }
        if (id != null && !id.isEmpty()) {
            criteriaList.add(Criteria.where("id").regex(id, "i"));
        }
        if (mobilePhone != null) {
            criteriaList.add(Criteria.where("phoneNumber").regex(mobilePhone, "i"));
        }
        if (accountNumber != null) {
            criteriaList.add(Criteria.where("accountNumber").regex(accountNumber, "i"));
        }
        if (firstName != null && !firstName.isEmpty()) {
            criteriaList.add(Criteria.where("firstName").regex(firstName, "i"));
        }
        if (middleName != null && !middleName.isEmpty()) {
            criteriaList.add(Criteria.where("middleName").regex(middleName, "i"));
        }
        if (lastName != null && !lastName.isEmpty()) {
            criteriaList.add(Criteria.where("lastName").regex(lastName, "i"));
        }

        criteriaList.add(Criteria.where("deletedDate").is(null));

        Query query = new Query();
        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        // Toplam eleman sayısını almak için
        long total = mongoTemplate.count(query, Customer.class);

        // Pagination için limit ve skip ekle
        query.with(pageable);

        // Sıralama işlemi
        if (sortField != null && !sortField.isEmpty()) {
            Sort.Direction direction = "desc".equalsIgnoreCase(sortOrder) ? Sort.Direction.DESC : Sort.Direction.ASC;
            query.with(Sort.by(direction, sortField));
        } else {
            query.with(Sort.by(Sort.Direction.ASC, "customerId"));
        }

        // Sayfalanmış verileri al
        List<Customer> customers = mongoTemplate.find(query, Customer.class);

        // Page nesnesi oluştur ve döndür
        return new PageImpl<>(customers, pageable, total);
    }
}
