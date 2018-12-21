#!/bin/sh
#cd ~/www/service/code && npm install && npm run dev
cat >scriptA <<EOF
#!/bin/sh
cd /Users/francesco/email_kafka_project/v0.2/database_service && node index.js
EOF
chmod +x scriptA

cat >scriptB <<EOF
#!/bin/sh
cd /Users/francesco/email_kafka_project/v0.2/kafka_service && node index.js
EOF
chmod +x scriptB

cat >scriptC <<EOF
#!/bin/sh
cd /Users/francesco/email_kafka_project/v0.2/email_service && node app.js
EOF
chmod +x scriptC

cat >scriptE <<EOF
#!/bin/sh
cd /Users/francesco/email_kafka_project/v0.2/kafka_client && node kafka_consumer.js
EOF
chmod +x scriptE

open -a Terminal.app scriptB
open -a Terminal.app scriptC
open -a Terminal.app scriptA
open -a Terminal.app scriptE