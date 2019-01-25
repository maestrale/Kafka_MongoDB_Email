<img width="878" alt="diagram" src="https://user-images.githubusercontent.com/26854301/51741131-07220800-2064-11e9-9785-f73b92fb42da.png">

Microservizi in Node.JS: MongoDB, Email, Kafka

Introduzione:

Il seguente software è una dimostrazione della architettura micro-servizi in Node.js. È composta da 4 differenti servizi (ognuno con server dedicato): 
Servizio Mongo/Database: effettua arbitrarie queries ad un istanza locale di MongoDB, e successivamente invia il risultato della query (tramite una chiamata rest /post/) al servizio (2) e (3);
Servizio Email: riceve il risultato della query in formato JSON che successivamente invia all'email designata;
Servizio Kafka. Riceve tramite chiamata rest da (1) il risultato della query il quale viene aggiunto alla coda di Kafka in qualita' di "Evento";
Kafka Client: client per Kafka, per terminale, per leggere i dati in coda a Kafka. Si occupa di effettuare l'output degli Eventi aggiunti a Kafka.


Installazione tramite script (Mac):

Installazione su Mac, utilizzando Terminal. Dove desiderate, create la cartella dove installare il progetto:

	mkdir directory_name 
	
Entrare nella Cartella:

	cd directory_name

Copiare il Codice Sorgente da Github:
	
	git clone https://github.com/maestrale/Kafka_MongoDB_Email


Entrare nella nuova cartella che è stata creata 'Kafka_:

	cd Kafka_MongoDB_Email


Eseguire il seguente script bash per installare tutti i moduli di Node.JS:

	bash install_services.sh


Chiamare questo secondo script per lanciare i 4 servizi contemporaneamente in Terminal:

	bash launch_services.sh



Dovrebbero aprirsi 4 finestre di Terminal, ognuna corrispondente a uno dei 4 servizi: (1) MongoDB, (2) Email, (3) Kafka Producer e (4) Kafka Consumer.

Installazione Manuale 

In caso gli script Bash non funzionassero, è possibile installare ed avviare i processi manualmente, nel modo che segue:

	cd database_service && npm install && node index.js
	cd email_service && npm install && node app.js
	cd kafka_service && npm install && node index.js
	cd kafka_client && npm install && node kafka_consumer.js

