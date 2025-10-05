# This Makefile includes common operational targets and configurations from:
-include ./ops/common/lvops/Makefile

# == Variables below ======================

compose_project_name = lvbe

app_port = 3001
app_target = development
app_image = lvbe

# == Primary targets below ======================

clean: down
	rm -rf .env src/node_module src/.env "$(compose_file_custom)"

# == Auxiliary targets below ======================

.env: $(compose_file_custom)
	cp -i src/.env.example src/.env || true
	cp -i <(cat <<<' # Build-related env variables
		APP_PORT="$(app_port)"
		APP_IMAGE="$(app_image)"
		APP_TARGET="$(app_target)"
		COMPOSE_FILE="$(compose_file):$(compose_file_custom)"
		COMPOSE_PROJECT_NAME="$(compose_project_name)"
		APP_GROUP_ID="$(APP_GROUP_ID)"
		APP_USER_ID="$(APP_USER_ID)"'
	) .env || true

install-deps:
	docker compose run --no-deps --rm app -- pnpm install --frozen-lockfile

# == QoL targets below ======================

help: help-primary help-auxiliary help-qol
