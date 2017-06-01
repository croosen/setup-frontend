#
# Marius van Witzenburg - http://mariusvw.com
#
# Wrong modifying a Makefile can seriously harm your system!
#

all: common install

common:
	@while [ -z "$$CONTINUE" ]; do \
	read -r -p "Are you sure? [y/N] " CONTINUE; \
	done ; \
	if [ "$$CONTINUE" != "y" ]; then \
	if [ "$$CONTINUE" != "Y" ]; then \
	echo "Exiting." ; exit 1 ; \
	fi \
	fi

install:
	if [ -f package.json ]; then npm install; fi
	if [ -f package.json ]; then npm dedupe; fi
	if [ -f bower.json ]; then bower prune; fi
	if [ -f bower.json ]; then bower install; fi
	if [ -f gulpfile.js ]; then gulp; fi
	@echo "Done..."
