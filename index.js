import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exp from "constants";


// Constants
const app = express();
const port = 6969;
const __dirname = dirname(fileURLToPath(import.meta.url));


// Helper Functions
function format_text(text) {
    return text.toLowerCase().replace(/^.|\s\S/g, function(a) { return a.toUpperCase(); })
}

let unique_ids = [];
function generate_uid(){
    let uid = Math.floor(Math.random() * 1000000);
    while(unique_ids.includes(uid)){
        uid = Math.floor(Math.random() * 1000000);
    }
    unique_ids.push(uid);
    return uid;
}


// Express

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs", { posts: posts });
});

app.get("/all", (req, res) => {
    res.render(__dirname + "/views/all_posts.ejs", { posts: posts });
});

app.get("/tech", (req, res) => {
    res.render(__dirname + "/views/tech.ejs", { posts: posts });
});

app.get("/science", (req, res) => {
    res.render(__dirname + "/views/science.ejs", { posts: posts });
});

app.get("/nature", (req, res) => {
    res.render(__dirname + "/views/nature.ejs", { posts: posts });
});

app.get("/create", (req, res) => {
    res.render(__dirname + "/views/create.ejs", { posts: posts });
});

app.post("/full_post", (req, res) => {
    let post = posts.find(post => post.uid == req.body.uid);
    res.render(__dirname + "/views/full_post.ejs", { post: post });
});3

app.post("/create", (req, res) => {
    let newPost = {};
    newPost.category = format_text(req.body.category);
    newPost.title = format_text(req.body.title);
    newPost.author = format_text(req.body.author);
    newPost.content = req.body.content;
    newPost.date = new Date().toISOString().split('T')[0]
    let imgInt = Math.floor(Math.random() * 3) + 1;
    newPost.image = `./assets/${newPost.category.toLowerCase()}${imgInt}.jpg`;
    newPost.uid = generate_uid();
    console.log("New Post Created!");
    console.log(newPost);
    posts.push(newPost);
    res.render(__dirname + "/views/create.ejs", { posts: posts, submitted: true });
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Global Variables

// Post Samples
/*
Post should have
Title:
Author:
Content:
Category:
Date:
Image:
*/
var posts = [
    {
        category: "Science",
        image: "./assets/science1.jpg",
        date: "2024-01-13",
        title: "Science is Cool!",
        author: "John Doe",
        content: "Science is the systematic study of the structure and behavior of the physical and natural world through observation and experimentation. It has led to countless discoveries and innovations that have transformed our lives unimaginably. From the invention of the wheel to the development of the internet, science has been at the forefront of human progress. It allows us to understand the universe, from the smallest particles to the vastness of space, and everything in between. Science is not just a body of knowledge, but a way of thinking and questioning the world around us. It encourages curiosity, critical thinking, and a desire to explore the unknown. One of the coolest aspects of science is its ability to solve real-world problems. Through scientific research, we have developed life-saving medicines, advanced technologies, and sustainable solutions to environmental challenges. Science has also given us the tools to explore other planets, understand the complexities of the human brain, and even manipulate the building blocks of life through genetic engineering. The possibilities are endless, and the pursuit of scientific knowledge continues to push the boundaries of what we know and can achieve. Science is a testament to human ingenuity and our relentless quest for understanding and improvement.",
        uid: generate_uid()
    },
    {
        category: "Tech",
        image: "./assets/tech1.jpg",
        date: "2024-01-22",
        title: "Tech is Cool!",
        author: "Jane Doe",
        content: "Technology is an ever-evolving field that has revolutionized the way we live, work, and interact with the world around us. From the invention of the wheel to the development of the internet, technology has been a driving force behind human progress. It has enabled us to achieve feats that were once thought impossible, such as instant global communication, space exploration, and advanced medical treatments. The rapid pace of technological advancements continues to push the boundaries of what we can accomplish, making our lives more convenient, efficient, and connected. One of the coolest aspects of technology is its ability to bring people together and bridge gaps across distances. Social media platforms, video conferencing tools, and messaging apps have made it easier than ever to stay in touch with friends and family, no matter where they are in the world. Additionally, technology has democratized access to information and education, allowing people from all walks of life to learn new skills, pursue their passions, and contribute to the global knowledge economy. As we look to the future, the potential for technology to drive positive change and improve our quality of life is limitless, making it an exciting and dynamic field to be a part of.",
        uid: generate_uid()
    },
    {
        category: "Nature",
        image: "./assets/nature1.jpg",
        date: "2024-02-03",
        title: "Nature is Cool!",
        author: "John Doe",
        content: "Nature is the natural world that surrounds us, encompassing all living and non-living things that exist independently of human activities. It includes the flora and fauna, landscapes, oceans, mountains, and all the ecosystems that make up our planet. Nature is a source of inspiration, beauty, and tranquility, providing us with a sense of peace and connection to the world around us. It plays a crucial role in sustaining life, offering resources such as clean air, water, and food, as well as regulating the climate and supporting biodiversity. The beauty of nature can be seen in the vibrant colors of a sunset, the intricate patterns of a leaf, and the majestic presence of a mountain range. It reminds us of the delicate balance that exists in the natural world and the importance of preserving it for future generations. By appreciating and protecting nature, we can ensure that its wonders continue to inspire and sustain us for years to come.",
        uid: generate_uid()
    },
    {
        category: "Science",
        image: "./assets/science2.jpg",
        date: "2024-02-18",
        title: "Cool Science Experiments!",
        author: "Jane Doe",
        content: "One cool science experiment that has captivated the imagination of many is the classic baking soda and vinegar volcano. This simple yet fascinating experiment demonstrates the chemical reaction between an acid (vinegar) and a base (baking soda), resulting in the production of carbon dioxide gas. When these two substances are combined, they create a bubbly, frothy eruption that mimics the appearance of a volcanic explosion. This experiment is not only visually impressive but also serves as an excellent introduction to basic chemistry concepts for students and enthusiasts alike. It highlights the principles of chemical reactions, gas production, and the effects of combining different substances. Another intriguing science experiment is the creation of a homemade lava lamp. By using common household items such as vegetable oil, water, food coloring, and effervescent tablets, you can create a mesmerizing display of colorful blobs that float and sink in a liquid-filled container. This experiment demonstrates the concepts of density and immiscibility, as the oil and water do not mix and have different densities. The effervescent tablets release carbon dioxide gas, causing the colored water to rise and fall in the oil, creating a captivating visual effect. This experiment not only provides a fun and engaging way to explore scientific principles but also results in a decorative and entertaining piece that can be enjoyed by people of all ages.",
        uid: generate_uid()
    },
    {
        category: "Tech",
        image: "./assets/tech2.jpg",
        date: "2024-03-10",
        title: "Cool Tech Inventions!",
        author: "John Doe",
        content: "Imagine a device that can instantly translate spoken language in real-time, allowing people from different parts of the world to communicate effortlessly. This hypothetical tech invention, called the Universal Translator, would be a small, portable gadget that you can carry in your pocket. Equipped with advanced speech recognition and artificial intelligence, the Universal Translator would be able to understand and translate any language with near-perfect accuracy. It would not only translate words but also capture the nuances and emotions behind them, making conversations more meaningful and authentic. This invention would revolutionize global communication, breaking down language barriers and fostering greater understanding and collaboration among people from diverse cultures. Another exciting tech invention could be the HoloPhone, a smartphone that projects holographic images and videos in 3D. The HoloPhone would use cutting-edge holographic display technology to create lifelike, interactive holograms that can be viewed from any angle. Imagine being able to have a video call where the person you're talking to appears as a hologram right in front of you, or watching a movie where the characters seem to come to life in your living room. The HoloPhone would also have advanced gesture recognition, allowing you to interact with the holograms using hand movements. This invention would take communication and entertainment to a whole new level, providing an immersive and engaging experience that goes beyond the capabilities of current smartphones.",
        uid: generate_uid()
    },
    {
        category: "Nature",
        image: "./assets/nature2.jpg",
        date: "2024-03-27",
        title: "The Beauty of Forests",
        author: "Jane Doe",
        content: "Forests are one of the most diverse and vital ecosystems on our planet. They provide habitat for countless species of plants and animals, regulate the climate, and produce oxygen. Walking through a forest can be a serene and rejuvenating experience, surrounded by the sounds of birds and the rustling of leaves. Protecting our forests is essential for maintaining biodiversity and combating climate change.",
        uid: generate_uid()
    },
    {
        category: "Science",
        image: "./assets/science3.jpg",
        date: "2024-04-02",
        title: "Exploring Space",
        author: "John Doe",
        content: "Space exploration has always fascinated humanity. From the first moon landing to the latest Mars rover missions, our quest to understand the universe continues. Advances in technology are enabling us to explore further and learn more about our solar system and beyond. Space exploration not only satisfies our curiosity but also drives innovation and inspires future generations.",
        uid: generate_uid()
    },
    {
        category: "Tech",
        image: "./assets/tech2.jpg",
        date: "2024-04-13",
        title: "The Future of AI",
        author: "Jane Doe",
        content: "Artificial Intelligence (AI) is transforming industries and changing the way we live and work. From self-driving cars to advanced medical diagnostics, AI has the potential to revolutionize many aspects of our lives. As AI technology continues to advance, it will bring new opportunities and challenges, making it an exciting field to watch.",
        uid: generate_uid()
    },
    {
        category: "Nature",
        image: "./assets/nature3.jpg",
        date: "2024-04-20",
        title: "Ocean Wonders",
        author: "John Doe",
        content: "The ocean covers more than 70% of the Earth's surface and is home to an incredible array of marine life. From the smallest plankton to the largest whales, the ocean is teeming with life. It also plays a crucial role in regulating the Earth's climate and weather patterns. Exploring the ocean's depths reveals a world of mystery and beauty, with vibrant coral reefs, deep-sea creatures, and underwater landscapes.",
        uid: generate_uid()
    },
    {
        category: "Science",
        image: "./assets/science1.jpg",
        date: "2024-05-11",
        title: "The Human Genome",
        author: "Jane Doe",
        content: "The study of the human genome has revolutionized our understanding of genetics and medicine. By mapping the entire human genome, scientists have gained insights into the genetic basis of diseases and developed new treatments. This knowledge is paving the way for personalized medicine, where treatments can be tailored to an individual's genetic makeup, improving outcomes and reducing side effects.",
        uid: generate_uid()
    },
    {
        category: "Tech",
        image: "./assets/tech1.jpg",
        date: "2024-05-23",
        title: "Smart Homes",
        author: "John Doe",
        content: "Smart home technology is making our lives more convenient and efficient. From voice-activated assistants to automated lighting and security systems, smart home devices are becoming increasingly popular. These innovations allow us to control our homes with ease, improve energy efficiency, and enhance security, making our living spaces more comfortable and connected.",
        uid: generate_uid()
    },
    {
        category: "Nature",
        image: "./assets/nature1.jpg",
        date: "2024-06-13",
        title: "Mountain Majesty",
        author: "Jane Doe",
        content: "Mountains are some of the most awe-inspiring natural features on Earth. They offer breathtaking views, challenging hikes, and a sense of tranquility. Mountains are also important for their role in the water cycle, as they capture and store precipitation, providing fresh water to rivers and streams. The diverse ecosystems found in mountainous regions are home to unique flora and fauna.",
        uid: generate_uid()
    },
    {
        category: "Science",
        image: "./assets/science2.jpg",
        date: "2024-07-18",
        title: "Climate Change",
        author: "John Doe",
        content: "Climate change is one of the most pressing issues of our time. Scientific research is crucial for understanding the causes and impacts of climate change and developing strategies to mitigate its effects. From studying ice cores to monitoring atmospheric changes, scientists are working tirelessly to provide the data and insights needed to address this global challenge and protect our planet for future generations.",
        uid: generate_uid()
    },
    {
        category: "Tech",
        image: "./assets/tech1.jpg",
        date: "2024-08-28",
        title: "Wearable Tech",
        author: "Jane Doe",
        content: "Wearable technology, such as smartwatches and fitness trackers, is becoming an integral part of our daily lives. These devices help us monitor our health, stay connected, and manage our time more effectively. As wearable tech continues to evolve, it will offer even more advanced features and capabilities, making it an essential tool for personal and professional use.",
        uid: generate_uid()
    },
    {
        category: "Nature",
        image: "./assets/nature2.jpg",
        date: "2024-09-15",
        title: "Desert Landscapes",
        author: "John Doe",
        content: "Deserts may seem barren, but they are full of life and beauty. These arid landscapes are home to specially adapted plants and animals that thrive in harsh conditions. The stark beauty of deserts, with their vast sand dunes, rocky outcrops, and clear night skies, offers a unique and peaceful experience. Deserts also hold important clues to the Earth's geological history and climate.",
        uid: generate_uid()
    }
];