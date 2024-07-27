# M1stral Selfbot (Multifonction et OSINT)

## Un Selfbot Discord initialement crée pour récupérer des reponses de [Snusbase](https://snusbase.com)

> [!NOTE]
> Le SelfBot est toujours dans une phase de développement expérimental et possède possiblement de nombreux bugs a corriger, pour m'informer si vous rencontrer un bug, vous pouvez créer un issue sur le GitHub du projet.

> [!WARNING]
> L'utilisation de cet utilitaire sur un compte utilisateur Discord est strictement interdit dans les [Termes et Conditions d'Utilisation de Discord](https://discord.com/terms), [à vos risques et périles](https://www.youtube.com/watch?v=dQw4w9WgXcQ) !

> [!CAUTION]
> L'utilisation de cet utilitaire est dans un cadre éducational uniquement, je ne suis pas responsable de ce que vous faites avec !


## À propos

Cet utilitaire est développer en TypeScript utilisant [discord.js-selfbot-v13](https://github.com/aiko-chan-ai/discord.js-selfbot-v13).

## Fonctionnalités
### Utilisateur
- [x] Implémentation de RichPresence réglable dans le dossier Utils/Misc/RPC/ (Permet de modifier son status Spotify ainsi que son status d'activité Discord.)
- [X] Commandes Help intuitive et simple
- [ ] Utilitaire d'installation, de mises a jours, de paramètrage et de lancement intuitif (Développement en cours...)
- [ ] SoundBoard intégrée
### Développement
- [X] Connexion a une base de données MongoDB et envoie de donnée de déboggage si demandé (Modifiable dans Settings.json)
- [X] Vérifications importantes pour que chaque commandes soient intuitive et simple à créer (Risque d'ajout pouvant affecter cet fonctionnalité.)
- [X] Gestions des erreurs et éviter les crashs total du SelfBot
- [X] Lookup de numéro de téléphone
- [ ] Documentation pour comprendre et parametrer le Selfbot ([Lire l'issue GitHub](https://github.com/SodaSiz/Snusbase-Discord-SelfBot/issues/1) pour comprendre pourquoi je ne vais pas faire de documentation pour l'instant.)
### OSINT
- [x] Lookup Snusbase
- [X] Lookup d'adresse IP
- [X] Lookup de numéro de téléphone
- [ ] Lookup de base de données
- [ ] Lookup NazAPI
