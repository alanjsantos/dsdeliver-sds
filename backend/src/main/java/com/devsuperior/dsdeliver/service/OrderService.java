package com.devsuperior.dsdeliver.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsdeliver.dto.OrderDTO;
import com.devsuperior.dsdeliver.dto.ProductDTO;
import com.devsuperior.dsdeliver.entity.Order;
import com.devsuperior.dsdeliver.entity.OrderStatus;
import com.devsuperior.dsdeliver.entity.Product;
import com.devsuperior.dsdeliver.repository.OrderRepository;
import com.devsuperior.dsdeliver.repository.ProductRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository repository;
	
	@Autowired
	private ProductRepository productsRepository;

	@Transactional(readOnly = true)
	public List<OrderDTO> findAll() {
		List<Order> list = repository.findOrderWithProducts();

		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList()); // convertendo Product para uma
																						// lista ProductDTO

	}

	@Transactional
	public OrderDTO insert(OrderDTO dto) {
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(), dto.getLongitude(), Instant.now(),
				OrderStatus.PENDING);
		
		//List de produtos (varrendo todos os produos.)
		for (ProductDTO p : dto.getProducts()) {
			//associando cada produto ao pedido: 
			//1. Instanciando uma enttidade correspondente a cada DTO.
			//2. injetar a dependencia ProductsRepository
			//3 Instanciar Product recebendo = productsRepository.getOne(p.getId()) (getOne() vai instanciar um produto, porém ele nao vai no banco de dados. Ele salva as assocações dos produtos que estão nos pedidos.)
			Product product = productsRepository.getOne(p.getId());
			order.getProducts().add(product);
		}
		
		order = repository.save(order);
		
		return new OrderDTO(order);
	}
	
	@Transactional
	public OrderDTO setDelivered(Long id) {
		Order order = repository.getOne(id);
		order.setStatus(OrderStatus.DELIVERED);
		
		order = repository.save(order);
		
		return new OrderDTO(order);
	}
}
