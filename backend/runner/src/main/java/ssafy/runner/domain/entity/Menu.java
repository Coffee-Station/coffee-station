package ssafy.runner.domain.entity;

import lombok.*;
import ssafy.runner.domain.enums.MenuStatus;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = {"shop", "category", "extraList", "menuSizeList"})
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    private List<Extra> extraList = new ArrayList<>();

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    private List<MenuSize> menuSizeList = new ArrayList<>();

    private String name;
    private String imgUrl; // 디폴트 이미지 넣어주는걸로 변경하기
    private int price;


    @Column(name = "is_signature")
    private boolean isSignature;

    @Enumerated(EnumType.STRING)
    private MenuStatus menuStatus;

    @Builder
    public Menu(Shop shop, Category category, String name, String imgUrl, int price, boolean isSignature, MenuStatus menuStatus) {
        this.shop = shop;
        this.category = category;
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.isSignature = isSignature;
        this.menuStatus = menuStatus;
    }

    public void updateMenu(Category category, String name, String imgUrl, int price, boolean isSignature) {
        this.category = category;
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.isSignature = isSignature;
    }

    public void updateMenuStatus(MenuStatus menuStatus) {
        this.menuStatus = menuStatus;
    }
}
