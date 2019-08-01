# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# User.destroy_all
# Room.destroy_all
# Background.destroy_all
# Item.destroy_all
# Decoration.destroy_all

# user_a = User.create(username: "Black-Capped Chickadee")
# user_b = User.create(username: "Grackle")
# user_c = User.create(username: "Common Starling")
# user_d = User.create(username: "Mourning Dove")
 
background_a = Background.create(name: "zoo", background_url: "../images/zoo_background2.jpg")
background_b = Background.create(name: "kids_room", background_url: "../images/bedroom1.png")
 
# room_a = Room.create(user: user_a, background: background_a)
# room_b = Room.create(user: user_a, background: background_b)

item_a = Item.create(name: "fox", item_url: "../images/fox.png", room_type: "zoo")
item_b = Item.create(name: "dog", item_url: "../images/dog1.png", room_type: "zoo")
item_c = Item.create(name: "sloth", item_url: "../images/sloth.png", room_type: "zoo")
item_d = Item.create(name: "sheep", item_url: "../images/sheep.png", room_type: "zoo")
item_e = Item.create(name: "tolkien", item_url: "../images/tolkien.gif", room_type: "zoo")


# decoration_a = Decoration.create(item: item_a, room: room_a)
# decoration_b = Decoration.create(item: item_b, room: room_a)
