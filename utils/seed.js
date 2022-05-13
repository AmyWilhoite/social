const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});


  // Create empty array to hold the users
  const users = [];
    // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random thought objects using a helper function that we imported from ./data
    const randomThought = getRandomThoughts(20);

    const userName = getRandomName();
    // const first = fullName.split(' ')[0];
    // const last = fullName.split(' ')[1];
    // const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      userName,
      randomThought,
    });
  }

  // Add users + thoughts to the collection and await the results
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // Add courses to the collection and await the results
  // await Thought.collection.insertOne({
  //   courseName: 'UCLA',
  //   inPerson: false,
  //   users: [...users],
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
