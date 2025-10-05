# lvbe
Live world back-end

  "_id": uuid
    parent_uuid
  "name": "Для Собак", | string
  "order": 0, | 
  "path": "Для Собак",
  "image": "https://storage.googleapis.com/live_world/categories/dlya_sobak.jpg",
  "filters": [ 
    "Бренд",
    "Країна реєстрації бренду",
    "Країна-виробник товару"
  ]

having our server we could store images locally.
establish parent to child connection between categories with parent_uuid
use camelCase in pqsl db

finish database and retrieve real data in getCategories endpoint 
