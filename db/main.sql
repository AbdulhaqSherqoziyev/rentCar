-- 1. Schema yaratish
CREATE SCHEMA ecommerce;

-- 2. ENUM turini yaratish
CREATE TYPE ecommerce.product_status AS ENUM (
  'out_of_stock',
  'in_stock',
  'running_low'
);

-- 3. countries jadvalini yaratish
CREATE TABLE countries (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    continent VARCHAR(50) NOT NULL
);

-- 4. users jadvalini yaratish
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    country_id INTEGER,
    is_active BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (country_id) REFERENCES countries (id)
);

-- 5. merchants jadvalini yaratish
CREATE TABLE ecommerce.merchants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_id INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    admin_id INTEGER NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES users (id),
    FOREIGN KEY (country_id) REFERENCES countries (id)
);

-- 6. products jadvalini yaratish
CREATE TABLE ecommerce.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    merchant_id INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status ecommerce.product_status DEFAULT 'in_stock',
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (merchant_id) REFERENCES ecommerce.merchants (id)
);

-- 7. tags jadvalini yaratish
CREATE TABLE ecommerce.tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- 8. product_tags jadvalini yaratish
CREATE TABLE ecommerce.product_tags (
    tag_id INTEGER,
    product_id INTEGER,
    PRIMARY KEY (tag_id, product_id),
    FOREIGN KEY (tag_id) REFERENCES ecommerce.tags (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES ecommerce.products (id) ON DELETE CASCADE
);

-- 9. orders jadvalini yaratish
CREATE TABLE ecommerce.orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

COMMENT ON COLUMN ecommerce.orders.created_at IS 'When order was created';

-- 10. order_items jadvalini yaratish
CREATE TABLE ecommerce.order_items (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES ecommerce.orders (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES ecommerce.products (id)
);

-- 11. merchant_activity jadvalini yaratish
CREATE TABLE ecommerce.merchant_activity (
    id SERIAL PRIMARY KEY,
    merchant_id INTEGER,
    country_id INTEGER,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    FOREIGN KEY (merchant_id) REFERENCES ecommerce.merchants (id),
    FOREIGN KEY (country_id) REFERENCES countries (id)
);
-- 13. otp jadvalini yaratish
CREATE TABLE ecommerce.otp (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    otp VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 12. Index yaratish
CREATE INDEX idx_product_status ON ecommerce.products (merchant_id, status);

CREATE INDEX idx_user_orders ON ecommerce.orders (user_id, status);