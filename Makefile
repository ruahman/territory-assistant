.PHONEY: up
up:
	@echo "Docker Compose Up"
	docker compose up -d 

.PHONEY: start 
start:
	@echo "Docker Compose Start"
	docker compose start

.PHONEY: golang
golang:
	@echo "Golang Shell"
	docker compose exec golang bash

.PHONEY: bun
bun:
	@echo "Bun Shell"
	docker compose exec bun bash

.PHONEY: postgres
postgres:
ifdef cmd
ifeq ($(cmd), shell)
	@echo "Postgres shell"
	docker compose exec postgres bash
endif
else
	@echo "Postgres psql"
	docker compose exec postgres psql -U postgres
endif

.PHONEY: down
down:
	@echo "Docker Compose Down"
	docker compose down --volumes

.PHONEY: stop 
stop:
	@echo "Docker Compose Stop"
	docker compose stop

.PHONEY: run 
run:
	@echo "...Run JW"
	go run main.go $(cmd)