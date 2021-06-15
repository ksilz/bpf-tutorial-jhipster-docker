package com.betterprojectsfaster.tutorial.jhipsterdocker.service.impl;

import com.betterprojectsfaster.tutorial.jhipsterdocker.domain.Address;
import com.betterprojectsfaster.tutorial.jhipsterdocker.repository.AddressRepository;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.AddressService;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.dto.AddressDTO;
import com.betterprojectsfaster.tutorial.jhipsterdocker.service.mapper.AddressMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Address}.
 */
@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    private final Logger log = LoggerFactory.getLogger(AddressServiceImpl.class);

    private final AddressRepository addressRepository;

    private final AddressMapper addressMapper;

    public AddressServiceImpl(AddressRepository addressRepository, AddressMapper addressMapper) {
        this.addressRepository = addressRepository;
        this.addressMapper = addressMapper;
    }

    @Override
    public AddressDTO save(AddressDTO addressDTO) {
        log.debug("Request to save Address : {}", addressDTO);
        Address address = addressMapper.toEntity(addressDTO);
        address = addressRepository.save(address);
        return addressMapper.toDto(address);
    }

    @Override
    public Optional<AddressDTO> partialUpdate(AddressDTO addressDTO) {
        log.debug("Request to partially update Address : {}", addressDTO);

        return addressRepository
            .findById(addressDTO.getId())
            .map(
                existingAddress -> {
                    addressMapper.partialUpdate(existingAddress, addressDTO);
                    return existingAddress;
                }
            )
            .map(addressRepository::save)
            .map(addressMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AddressDTO> findAll() {
        log.debug("Request to get all Addresses");
        return addressRepository.findAll().stream().map(addressMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AddressDTO> findOne(Long id) {
        log.debug("Request to get Address : {}", id);
        return addressRepository.findById(id).map(addressMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Address : {}", id);
        addressRepository.deleteById(id);
    }
}
