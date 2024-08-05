# Καθορίζει την έκδοση του Node.js που θα χρησιμοποιηθεί
FROM node:18

# Δημιουργία του working directory μέσα στο container
WORKDIR /usr/src/app

# Αντιγραφή των αρχείων package.json και package-lock.json
COPY package*.json ./

# Εγκατάσταση των εξαρτήσεων
RUN npm install

# Αντιγραφή όλων των υπόλοιπων αρχείων στον working directory
COPY . .

# Άνοιγμα της πόρτας 3000 για να είναι προσβάσιμη η εφαρμογή
EXPOSE 3000

# Ορισμός της εντολής για την εκκίνηση της εφαρμογής
CMD [ "npm", "run", "start" ]
