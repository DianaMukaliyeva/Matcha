ALTER DATABASE matcha SET timezone TO 'Europe/Helsinki';

DO $$ BEGIN
    CREATE TYPE gender AS ENUM ('man', 'woman');
    CREATE TYPE notification_type AS ENUM ('message', 'like', 'unlike', 'visit');
    CREATE TYPE sex_preference AS ENUM ('man', 'woman', 'both');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE EXTENSION postgis;

CREATE EXTENSION postgis_topology;


CREATE TABLE IF NOT EXISTS "users"
(
 "user_id"                  bigserial PRIMARY KEY NOT NULL,
 "first_name"               varchar(32) NULL ,
 "last_name"                varchar(32) NULL ,
 "username"                 varchar(32) UNIQUE NULL ,
 "email"                    varchar(64) UNIQUE NOT NULL ,
 "password"                 varchar(1000) NOT NULL ,
 "token"                    varchar(255) NULL ,
 "status"                   int NOT NULL DEFAULT 0 ,
 "online"                   int NOT NULL DEFAULT 0 ,
 "birth_date"               date NULL ,
 "gender"                   gender NULL ,
 "latitude"                 float NULL ,
 "longitude"                float NULL ,
 "bio"                      text NULL ,
 "fame_rating"              double precision DEFAULT 0 ,
 "fame_14_days"             bigint DEFAULT 0 ,
 "last_seen"                timestamp NULL ,
 "created_at"               timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "sex_preference"           sex_preference NULL ,
 "sex_orientation"          character varying COLLATE pg_catalog."default",
 "western_horo"             varchar(45) NULL ,
 "chinese_horo"             varchar(45) NULL ,
 "profile_pic_path"         varchar(255) NULL ,
 "country"                  varchar(255) NULL ,
 "geolocation"              geography(Point,4326)
);

CREATE TABLE IF NOT EXISTS "notifications"
(
 "notification_id" serial NOT NULL PRIMARY KEY,
 "to_user_id"      bigint NOT NULL REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 "from_user_id"    bigint NOT NULL REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 "type"            notification_type NOT NULL
);

CREATE TABLE IF NOT EXISTS "western_horo_compatibility"
(
 "sign_1"               varchar(50) NOT NULL ,
 "sign_2"               varchar(50) NOT NULL ,
 "compatibility_value" int NOT NULL ,
 PRIMARY KEY ( "sign_1", "sign_2" )
);

CREATE TABLE IF NOT EXISTS "views"
(
 "view_id"      bigserial NOT NULL PRIMARY KEY,
 "date_created" timestamp DEFAULT CURRENT_TIMESTAMP ,
 "from_user_id" bigint NOT NULL REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 "to_user_id"   bigint NOT NULL REFERENCES "users" ( "user_id" ) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "tags"
(
 "tag_id"   bigserial NOT NULL PRIMARY KEY,
 "tag_name" varchar(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_tags"
(
 "id"      bigserial NOT NULL PRIMARY KEY,
 "user_id" bigint NOT NULL REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 "tag_id"  bigint NOT NULL REFERENCES "tags" ( "tag_id" ) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "reported"
(
 "report_id"        bigserial NOT NULL PRIMARY KEY,
 "from_user_id"          bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "to_user_id" bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "created_at"       timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "blocked"
(
 "block_id"        bigserial NOT NULL PRIMARY KEY,
 "from_user_id"         bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "to_user_id" bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "created_at"      timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "chats"
(
 "chat_id"    bigserial NOT NULL PRIMARY KEY,
 "user_1"     bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "user_2"     bigint NULL REFERENCES "users" ("user_id") ON DELETE CASCADE,
 "started_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "active"     boolean NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS "chinese_horo_compatibility"
(
 "sign_1"               varchar(50) NOT NULL,
 "sign_2"               varchar(50) NOT NULL,
 "compatibility_value"  int NOT NULL,
 PRIMARY KEY ( "sign_1", "sign_2" )
);

CREATE TABLE IF NOT EXISTS "images"
(
 "image_id"     bigserial NOT NULL PRIMARY KEY ,
 "user_id"      bigint NULL  REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 "image_path"   varchar(255) NULL
);

CREATE TABLE IF NOT EXISTS "likes"
(
 "like_id"      bigserial NOT NULL PRIMARY KEY ,
 "date_created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "from_user_id" bigint NOT NULL ,
 "to_user_id"   bigint NOT NULL ,
 CONSTRAINT "FK_70" FOREIGN KEY ( "from_user_id" ) REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 CONSTRAINT "FK_71" FOREIGN KEY ( "to_user_id" ) REFERENCES "users" ( "user_id" ) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "fkIdx_70" ON "likes"
(
 "from_user_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_71" ON "likes"
(
 "to_user_id"
);

CREATE TABLE IF NOT EXISTS "messages"
(
 "message_id"   bigserial NOT NULL PRIMARY KEY,
 "message"      text NULL ,
 "time_sent"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 "chat_id"      bigint NOT NULL ,
 "sender_id"    bigint NOT NULL ,
 CONSTRAINT "FK_72" FOREIGN KEY ( "sender_id" ) REFERENCES "users" ( "user_id" ) ON DELETE CASCADE,
 CONSTRAINT "FK_73" FOREIGN KEY ( "chat_id" ) REFERENCES "chats" ("chat_id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "fkIdx_72" ON "messages"
(
 "sender_id"
);

CREATE INDEX IF NOT EXISTS "fkIdx_73" ON "messages"
(
 "chat_id"
);
