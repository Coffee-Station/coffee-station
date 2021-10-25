package ssafy.runner.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ShopImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    private Shop shop;

    private String img_url;
    private Integer index;

}