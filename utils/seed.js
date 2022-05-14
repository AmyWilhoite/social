const connection = require('../config/connection');
const { Thought, User } = require('../models');
const userData = require('./userData');
const thoughtData = require ('./thoughtData');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});


  // Add users + thoughts to the collection and await the results
  await User.collection.insertMany(userData);
  await Thought.collection.insertMany(thoughtData);

  // Log out the seed data to indicate what should appear in the database
  console.table(userData);
  console.table(thoughtData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});




  // // Create empty array to hold the users
  // const users = [];
  //   // Create empty array to hold the thoughts
  // const thoughts = [];

  // // Loop 20 times -- add users to the users array
  // for (let i = 0; i < 20; i++) {
   
  //   // Get some random thought objects using a helper function that we imported from ./data
  //   const randomThought = getRandomThoughts();
  //   const randomName = getRandomName(); 

  //   users.push({
  //     randomName,
  //     randomThought,
  //   });
  // }