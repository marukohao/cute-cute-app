# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


background_a = Background.create(name: "zoo", background_url: "../images/backgrounds/zoo_background.jpg")
background_b = Background.create(name: "kids_room", background_url: "../images/backgrounds/backgroundkid.jpg")
background_c = Background.create(name: "kitchen", background_url: "../images/backgrounds/background_kitchen.jpg")


zoo_item_a = Item.create(name: "fox", item_url: "../images/zoo-items/fox.png", room_type: "zoo")
zoo_item_b = Item.create(name: "lion", item_url: "../images/zoo-items/lionchanged.png", room_type: "zoo")
zoo_item_c = Item.create(name: "sloth", item_url: "../images/zoo-items/sloth.png", room_type: "zoo")
zoo_item_d = Item.create(name: "giraffe", item_url: "../images/zoo-items/giraffechanged.png", room_type: "zoo")
zoo_item_e = Item.create(name: "tolkien", item_url: "../images/zoo-items/tolkien.gif", room_type: "zoo")

kitchen_item_a = Item.create(name: "cupcake", item_url: "../images/kitchen-items/cupcake.png", room_type: "kitchen")
kitchen_item_b = Item.create(name: "icecream", item_url: "../images/kitchen-items/icecream.png", room_type: "kitchen")
kitchen_item_c = Item.create(name: "fries", item_url: "../images/kitchen-items/fries.png", room_type: "kitchen")
kitchen_item_d = Item.create(name: "pizza", item_url: "../images/kitchen-items/pizza.png", room_type: "kitchen")
kitchen_item_e = Item.create(name: "sushi", item_url: "../images/kitchen-items/sushi.gif", room_type: "kitchen")

kids_room_item_a = Item.create(name: "dog", item_url: "../images/kids_room_items/dog1.png", room_type: "kids_room")
kids_room_item_b = Item.create(name: "armyman", item_url: "../images/kids_room_items/armyman.png", room_type: "kids_room")
kids_room_item_c = Item.create(name: "bear", item_url: "../images/kids_room_items/bear.gif", room_type: "kids_room")
kids_room_item_d = Item.create(name: "luckycat", item_url: "../images/kids_room_items/luckycat.png", room_type: "kids_room")
kids_room_item_e = Item.create(name: "robot", item_url: "../images/kids_room_items/robot.png", room_type: "kids_room")
