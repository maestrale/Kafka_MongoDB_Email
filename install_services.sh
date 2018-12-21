#!/bin/sh
#cd ~/www/service/code && npm install && npm run dev
cat >scriptX <<EOF
#!/bin/sh
cd /Users/francesco/email_kafka_project/v0.2/database_service && npm install
EOF
chmod +x scriptX

cat >scriptY <<EOF
#!/bin/sh
cd /Users/francesco/email_kafka_project/v0.2/kafka_service && npm install
EOF
chmod +x scriptY

cat >scriptS <<EOF
#!/bin/sh
cd /Users/francesco/email_kafka_project/v0.2/email_service && npm install
EOF
chmod +x scriptS

cat >scriptZ <<EOF
#!/bin/sh
cd /Users/francesco/email_kafka_project/v0.2/kafka_client && npm install
EOF
chmod +x scriptZ

open -a Terminal.app scriptX
open -a Terminal.app scriptY
open -a Terminal.app scriptS
open -a Terminal.app scriptZ