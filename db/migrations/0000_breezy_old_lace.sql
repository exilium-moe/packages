CREATE TABLE "pulls" (
	"server" text NOT NULL,
	"uid" integer NOT NULL,
	"cardPoolType" smallint NOT NULL,
	"pool_id" integer NOT NULL,
	"item" integer NOT NULL,
	"rarity" text NOT NULL,
	"time" text NOT NULL,
	"num" integer NOT NULL,
	"p4" smallint NOT NULL,
	"p5" smallint NOT NULL,
	"isSorted" boolean NOT NULL,
	CONSTRAINT "pulls_server_uid_cardPoolType_num_pk" PRIMARY KEY("server","uid","cardPoolType","num")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"server" text NOT NULL,
	"uid" integer NOT NULL,
	CONSTRAINT "users_server_uid_pk" PRIMARY KEY("server","uid")
);
--> statement-breakpoint
ALTER TABLE "pulls" ADD CONSTRAINT "fk_pulls_users" FOREIGN KEY ("server","uid") REFERENCES "public"."users"("server","uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_pulls_server_uid_pool_time" ON "pulls" USING btree ("server","uid","cardPoolType","time" DESC NULLS LAST);