package org.example.searchservice.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.searchservice.dto.SearchResponse;
import org.example.searchservice.service.FilterService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin()
@RequestMapping("api/search")
public class SearchCustomerController {
    private FilterService filterService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<SearchResponse> search(
            @RequestParam(defaultValue = "0") int page, // Sayfa numarası (0'dan başlar)
            @RequestParam(defaultValue = "10") int sizePerPage, // Sayfa başına öğe sayısı
            @RequestParam(required = false) String nationalityId,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String accountNumber,
            @RequestParam(required = false) String mobilePhone,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String middleName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String sortField,
            @RequestParam(required = false) String sortOrder
    ) {
        // Pageable parametresi ile pagination bilgisini oluşturun
        Pageable pageable = PageRequest.of(page, sizePerPage);

        // Servis katmanına pageable'ı gönderin
        return this.filterService.search(
                nationalityId, id, accountNumber, mobilePhone, firstName, middleName, lastName, sortField, sortOrder, pageable
        );
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public List<SearchResponse> getAll(){
        return this.filterService.getAll();
    }

}
