package ssafy.runner.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOrderMenu is a Querydsl query type for OrderMenu
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QOrderMenu extends EntityPathBase<OrderMenu> {

    private static final long serialVersionUID = -1395435736L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOrderMenu orderMenu = new QOrderMenu("orderMenu");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMenu menu;

    public final QMenuSize menuSize;

    public final QOrders order;

    public final ListPath<OrderMenuExtra, QOrderMenuExtra> orderMenuExtras = this.<OrderMenuExtra, QOrderMenuExtra>createList("orderMenuExtras", OrderMenuExtra.class, QOrderMenuExtra.class, PathInits.DIRECT2);

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Integer> quantity = createNumber("quantity", Integer.class);

    public QOrderMenu(String variable) {
        this(OrderMenu.class, forVariable(variable), INITS);
    }

    public QOrderMenu(Path<? extends OrderMenu> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOrderMenu(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOrderMenu(PathMetadata metadata, PathInits inits) {
        this(OrderMenu.class, metadata, inits);
    }

    public QOrderMenu(Class<? extends OrderMenu> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.menu = inits.isInitialized("menu") ? new QMenu(forProperty("menu"), inits.get("menu")) : null;
        this.menuSize = inits.isInitialized("menuSize") ? new QMenuSize(forProperty("menuSize"), inits.get("menuSize")) : null;
        this.order = inits.isInitialized("order") ? new QOrders(forProperty("order"), inits.get("order")) : null;
    }

}

