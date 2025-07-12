import React from 'react';
import { Calendar, Clock, Eye, ArrowRight, Brain, Code, Zap, BookOpen, Target, Lightbulb, Plus, ChevronDown, ChevronUp, X, ArrowLeft, ExternalLink } from 'lucide-react';

const Blog = () => {
  const [showAllPosts, setShowAllPosts] = React.useState(false);
  const [postViews, setPostViews] = React.useState({});

  // Initialize view tracking - start from zero and reset any existing data
  React.useEffect(() => {
    // Get existing views from localStorage or start with zeros
    const savedViews = localStorage.getItem('blogPostViews');
    const initialViews = savedViews ? JSON.parse(savedViews) : {
      1: 0,
      2: 0
    };
    setPostViews(initialViews);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Neural Networks: A Beginner\'s Guide',
      excerpt: 'Neural networks are the backbone of modern AI. In this comprehensive guide, we explore the mathematical foundations, architecture patterns, and practical applications.',
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">Neural networks are the backbone of modern AI. In this comprehensive guide, we explore the mathematical foundations, architecture patterns, and practical applications of neural networks to help you understand how machines learn.</p>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 class="text-xl font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
              <span class="mr-2">🔍</span> What is a Neural Network?
            </h3>
            <p class="text-blue-800 dark:text-blue-200">A neural network is a set of algorithms designed to recognize patterns—just like the human brain. It interprets sensory data through a kind of machine perception, labeling, or clustering of raw input. Whether it's identifying a face in a photo or predicting tomorrow's weather, neural networks form the heart of most intelligent systems today.</p>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 class="text-xl font-bold text-purple-900 dark:text-purple-300 mb-3 flex items-center">
              <span class="mr-2">🧠</span> The Inspiration: Biological Neurons
            </h3>
            <p class="text-purple-800 dark:text-purple-200">Artificial Neural Networks (ANNs) are loosely inspired by the structure of the human brain. Our brain contains billions of neurons, each connected to thousands of others. In a similar way, a neural network is made up of artificial neurons (or nodes), which are connected in layers.</p>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
            <h3 class="text-xl font-bold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <span class="mr-2">📐</span> The Mathematical Foundation
            </h3>
            <p class="text-green-800 dark:text-green-200 mb-4">At the core, a neural network is a mathematical model made up of:</p>
            <ul class="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
              <li><strong>Inputs:</strong> Features or data points (e.g., pixels in an image)</li>
              <li><strong>Weights & Biases:</strong> Parameters adjusted during learning</li>
              <li><strong>Activation Functions:</strong> Determine whether a neuron should be activated (e.g., sigmoid, ReLU)</li>
              <li><strong>Output:</strong> The final prediction or classification</li>
            </ul>
            <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm">
              output = activation(weighted sum of inputs + bias)
            </div>
            <p class="text-green-800 dark:text-green-200 mt-3">Through a process called backpropagation, the network adjusts its internal weights based on the error in its predictions, making it smarter over time.</p>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 class="text-xl font-bold text-orange-900 dark:text-orange-300 mb-3 flex items-center">
              <span class="mr-2">🧱</span> Neural Network Architecture
            </h3>
            <p class="text-orange-800 dark:text-orange-200 mb-4">Neural networks come in many shapes and sizes, but the most common types include:</p>
            <div class="space-y-3">
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-orange-900 dark:text-orange-300">1. Feedforward Neural Networks (FNNs)</h4>
                <p class="text-sm text-orange-700 dark:text-orange-200">Simplest form. Information flows in one direction—from input to output. Commonly used for classification tasks.</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-orange-900 dark:text-orange-300">2. Convolutional Neural Networks (CNNs)</h4>
                <p class="text-sm text-orange-700 dark:text-orange-200">Ideal for image and video recognition. Detect spatial hierarchies in data (edges, shapes, objects).</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-orange-900 dark:text-orange-300">3. Recurrent Neural Networks (RNNs)</h4>
                <p class="text-sm text-orange-700 dark:text-orange-200">Designed for sequential data (e.g., text, time series). Remember previous inputs via loops in the network.</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-orange-900 dark:text-orange-300">4. Transformers</h4>
                <p class="text-sm text-orange-700 dark:text-orange-200">Modern architecture for natural language processing. Powering models like ChatGPT, BERT, and more.</p>
              </div>
            </div>
          </div>

          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border-l-4 border-indigo-500">
            <h3 class="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center">
              <span class="mr-2">⚙️</span> Training a Neural Network
            </h3>
            <p class="text-indigo-800 dark:text-indigo-200 mb-4">To train a neural network:</p>
            <ol class="list-decimal list-inside space-y-2 text-indigo-800 dark:text-indigo-200">
              <li><strong>Collect Data</strong> – Clean, labeled datasets</li>
              <li><strong>Initialize the Network</strong> – Set up architecture and random weights</li>
              <li><strong>Forward Pass</strong> – Calculate predictions</li>
              <li><strong>Compute Loss</strong> – Measure prediction error</li>
              <li><strong>Backpropagate</strong> – Adjust weights to minimize error</li>
              <li><strong>Repeat</strong> – Through multiple iterations (epochs), the network improves</li>
            </ol>
          </div>

          <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border-l-4 border-teal-500">
            <h3 class="text-xl font-bold text-teal-900 dark:text-teal-300 mb-3 flex items-center">
              <span class="mr-2">🌍</span> Real-World Applications
            </h3>
            <p class="text-teal-800 dark:text-teal-200 mb-4">Neural networks are everywhere:</p>
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-teal-900 dark:text-teal-300">Computer Vision</h4>
                <p class="text-sm text-teal-700 dark:text-teal-200">Face detection, self-driving cars, medical imaging</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-teal-900 dark:text-teal-300">Natural Language Processing</h4>
                <p class="text-sm text-teal-700 dark:text-teal-200">Translation, sentiment analysis, chatbots</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-teal-900 dark:text-teal-300">Finance</h4>
                <p class="text-sm text-teal-700 dark:text-teal-200">Fraud detection, stock market prediction</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-teal-900 dark:text-teal-300">Healthcare</h4>
                <p class="text-sm text-teal-700 dark:text-teal-200">Disease diagnosis, drug discovery</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-teal-900 dark:text-teal-300">Gaming & Robotics</h4>
                <p class="text-sm text-teal-700 dark:text-teal-200">Strategy learning, real-time decision making</p>
              </div>
            </div>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
            <h3 class="text-xl font-bold text-red-900 dark:text-red-300 mb-3 flex items-center">
              <span class="mr-2">🧩</span> Challenges and Limitations
            </h3>
            <p class="text-red-800 dark:text-red-200 mb-4">Despite their power, neural networks are not perfect:</p>
            <ul class="list-disc list-inside space-y-2 text-red-800 dark:text-red-200">
              <li>Require large amounts of data</li>
              <li>Can be computationally expensive</li>
              <li>Often act as black boxes—it's hard to explain why they made a decision</li>
              <li>Susceptible to biases in training data</li>
            </ul>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
              <span class="mr-2">🧠</span> Final Thoughts
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">Understanding neural networks is the first step into the fascinating world of artificial intelligence. While they might seem complex at first, their core concepts are rooted in simple mathematical principles. As research advances, neural networks continue to evolve, becoming more powerful, efficient, and integrated into our daily lives.</p>
            <p class="text-gray-700 dark:text-gray-300">Whether you're an aspiring data scientist or a curious tech enthusiast, diving into neural networks is both rewarding and essential in today's AI-driven world.</p>
          </div>

          <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-3">Ready to Learn More?</h3>
            <p class="mb-4">Have questions or want to build your own neural network? I'd love to help you get started on your AI journey!</p>
            <div class="flex flex-wrap gap-3">
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">#NeuralNetworks</span>
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">#MachineLearning</span>
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">#AI</span>
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">#DeepLearning</span>
            </div>
          </div>
        </div>
      `,
      date: '2024-12-15',
      readTime: '12 min read',
      category: 'Machine Learning',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Neural Networks', 'Deep Learning', 'AI', 'Mathematics', 'Beginner Guide'],
      featured: true,
      mediumUrl: 'https://medium.com/@mahesh-chitikeshi'
    },
    {
      id: 2,
      title: 'Building a Recommendation System with Python',
      excerpt: 'Step-by-step guide to creating a collaborative filtering recommendation system from scratch using Python, Pandas, and Scikit-learn.',
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed">Recommendation systems power many of the platforms we use daily—from Netflix suggesting your next binge-watch to Amazon recommending products. In this comprehensive tutorial, we'll build a recommendation system from scratch using Python, exploring both collaborative filtering and content-based approaches.</p>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 class="text-xl font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
              <span class="mr-2">🎯</span> What is a Recommendation System?
            </h3>
            <p class="text-blue-800 dark:text-blue-200">A recommendation system is an algorithm designed to suggest relevant items to users based on their preferences, behavior, or characteristics. These systems help users discover new content while helping businesses increase engagement and sales.</p>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
            <h3 class="text-xl font-bold text-green-900 dark:text-green-300 mb-3 flex items-center">
              <span class="mr-2">🔧</span> Types of Recommendation Systems
            </h3>
            <div class="space-y-3">
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-green-900 dark:text-green-300">1. Collaborative Filtering</h4>
                <p class="text-sm text-green-700 dark:text-green-200">Recommends items based on user behavior and preferences of similar users. "Users who liked this also liked..."</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-green-900 dark:text-green-300">2. Content-Based Filtering</h4>
                <p class="text-sm text-green-700 dark:text-green-200">Recommends items similar to those the user has liked before, based on item features and characteristics.</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-green-900 dark:text-green-300">3. Hybrid Systems</h4>
                <p class="text-sm text-green-700 dark:text-green-200">Combines multiple approaches to leverage the strengths of different methods and overcome individual limitations.</p>
              </div>
            </div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 class="text-xl font-bold text-purple-900 dark:text-purple-300 mb-3 flex items-center">
              <span class="mr-2">📚</span> Required Libraries
            </h3>
            <p class="text-purple-800 dark:text-purple-200 mb-4">Let's start by importing the necessary Python libraries:</p>
            <div class="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
import matplotlib.pyplot as plt
import seaborn as sns</pre>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 class="text-xl font-bold text-orange-900 dark:text-orange-300 mb-3 flex items-center">
              <span class="mr-2">📊</span> Data Preparation
            </h3>
            <p class="text-orange-800 dark:text-orange-200 mb-4">For this tutorial, we'll use a movie ratings dataset. Here's how to prepare your data:</p>
            <div class="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre># Load the dataset
ratings = pd.read_csv('ratings.csv')
movies = pd.read_csv('movies.csv')

# Create user-item matrix
user_item_matrix = ratings.pivot_table(
    index='userId', 
    columns='movieId', 
    values='rating'
).fillna(0)

print(f"Matrix shape: {user_item_matrix.shape}")
print(f"Sparsity: {(user_item_matrix == 0).sum().sum() / (user_item_matrix.shape[0] * user_item_matrix.shape[1]) * 100:.2f}%")</pre>
            </div>
          </div>

          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border-l-4 border-indigo-500">
            <h3 class="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center">
              <span class="mr-2">🤝</span> Collaborative Filtering Implementation
            </h3>
            <p class="text-indigo-800 dark:text-indigo-200 mb-4">Let's implement user-based collaborative filtering:</p>
            <div class="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>def collaborative_filtering_recommendations(user_id, user_item_matrix, n_recommendations=5):
    # Calculate user similarity using cosine similarity
    user_similarity = cosine_similarity(user_item_matrix)
    user_similarity_df = pd.DataFrame(
        user_similarity, 
        index=user_item_matrix.index, 
        columns=user_item_matrix.index
    )
    
    # Get similar users
    similar_users = user_similarity_df[user_id].sort_values(ascending=False)[1:11]
    
    # Get movies rated by similar users
    similar_users_ratings = user_item_matrix.loc[similar_users.index]
    
    # Calculate weighted average ratings
    weighted_ratings = similar_users_ratings.T.dot(similar_users) / similar_users.sum()
    
    # Filter out movies already rated by the user
    user_rated_movies = user_item_matrix.loc[user_id]
    recommendations = weighted_ratings[user_rated_movies == 0].sort_values(ascending=False)
    
    return recommendations.head(n_recommendations)

# Example usage
user_id = 1
recommendations = collaborative_filtering_recommendations(user_id, user_item_matrix)
print(f"Recommendations for User {user_id}:")
print(recommendations)</pre>
            </div>
          </div>

          <div class="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border-l-4 border-teal-500">
            <h3 class="text-xl font-bold text-teal-900 dark:text-teal-300 mb-3 flex items-center">
              <span class="mr-2">🎬</span> Content-Based Filtering
            </h3>
            <p class="text-teal-800 dark:text-teal-200 mb-4">Now let's implement content-based filtering using movie genres:</p>
            <div class="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>def content_based_recommendations(movie_id, movies_df, n_recommendations=5):
    # Create TF-IDF matrix for movie genres
    tfidf = TfidfVectorizer(stop_words='english')
    movies_df['genres'] = movies_df['genres'].fillna('')
    tfidf_matrix = tfidf.fit_transform(movies_df['genres'])
    
    # Calculate cosine similarity between movies
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # Get movie index
    idx = movies_df[movies_df['movieId'] == movie_id].index[0]
    
    # Get similarity scores for all movies
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Get top similar movies (excluding the movie itself)
    movie_indices = [i[0] for i in sim_scores[1:n_recommendations+1]]
    
    return movies_df.iloc[movie_indices][['title', 'genres']]

# Example usage
movie_id = 1
similar_movies = content_based_recommendations(movie_id, movies)
print(f"Movies similar to movie {movie_id}:")
print(similar_movies)</pre>
            </div>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
            <h3 class="text-xl font-bold text-yellow-900 dark:text-yellow-300 mb-3 flex items-center">
              <span class="mr-2">⚡</span> Matrix Factorization with SVD
            </h3>
            <p class="text-yellow-800 dark:text-yellow-200 mb-4">For better performance with large datasets, let's use Singular Value Decomposition:</p>
            <div class="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>def svd_recommendations(user_id, user_item_matrix, n_components=50, n_recommendations=5):
    # Apply SVD
    svd = TruncatedSVD(n_components=n_components, random_state=42)
    user_factors = svd.fit_transform(user_item_matrix)
    item_factors = svd.components_
    
    # Reconstruct the matrix
    predicted_ratings = np.dot(user_factors, item_factors)
    predicted_df = pd.DataFrame(
        predicted_ratings, 
        index=user_item_matrix.index, 
        columns=user_item_matrix.columns
    )
    
    # Get user's actual ratings
    user_ratings = user_item_matrix.loc[user_id]
    
    # Get predictions for unrated movies
    unrated_movies = user_ratings[user_ratings == 0].index
    user_predictions = predicted_df.loc[user_id, unrated_movies]
    
    return user_predictions.sort_values(ascending=False).head(n_recommendations)

# Example usage
svd_recs = svd_recommendations(1, user_item_matrix)
print("SVD-based recommendations:")
print(svd_recs)</pre>
            </div>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
            <h3 class="text-xl font-bold text-red-900 dark:text-red-300 mb-3 flex items-center">
              <span class="mr-2">📈</span> Evaluation Metrics
            </h3>
            <p class="text-red-800 dark:text-red-200 mb-4">To evaluate our recommendation system, we can use several metrics:</p>
            <div class="space-y-3">
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-red-900 dark:text-red-300">Mean Absolute Error (MAE)</h4>
                <p class="text-sm text-red-700 dark:text-red-200">Measures the average absolute difference between predicted and actual ratings.</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-red-900 dark:text-red-300">Root Mean Square Error (RMSE)</h4>
                <p class="text-sm text-red-700 dark:text-red-200">Penalizes larger errors more heavily than MAE.</p>
              </div>
              <div class="p-3 bg-white dark:bg-gray-800 rounded">
                <h4 class="font-semibold text-red-900 dark:text-red-300">Precision@K and Recall@K</h4>
                <p class="text-sm text-red-700 dark:text-red-200">Measures the relevance of top-K recommendations.</p>
              </div>
            </div>
          </div>

          <div class="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg border-l-4 border-pink-500">
            <h3 class="text-xl font-bold text-pink-900 dark:text-pink-300 mb-3 flex items-center">
              <span class="mr-2">🚀</span> Production Considerations
            </h3>
            <p class="text-pink-800 dark:text-pink-200 mb-4">When deploying recommendation systems in production:</p>
            <ul class="list-disc list-inside space-y-2 text-pink-800 dark:text-pink-200">
              <li><strong>Cold Start Problem:</strong> Handle new users/items with no historical data</li>
              <li><strong>Scalability:</strong> Use distributed computing for large datasets</li>
              <li><strong>Real-time Updates:</strong> Implement incremental learning for new interactions</li>
              <li><strong>Diversity:</strong> Balance accuracy with recommendation diversity</li>
              <li><strong>Bias:</strong> Address popularity bias and filter bubbles</li>
            </ul>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
              <span class="mr-2">💡</span> Next Steps
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">You've now built a complete recommendation system! Here are some ways to enhance it further:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Implement deep learning approaches using neural collaborative filtering</li>
              <li>Add implicit feedback (views, clicks) alongside explicit ratings</li>
              <li>Experiment with ensemble methods combining multiple algorithms</li>
              <li>Implement A/B testing to measure real-world performance</li>
              <li>Add explanation features to make recommendations interpretable</li>
            </ul>
          </div>

          <div class="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-3">Ready to Build Your Own?</h3>
            <p class="mb-4">Recommendation systems are fascinating and have endless possibilities for customization. Start with this foundation and adapt it to your specific use case!</p>
            <div class="flex flex-wrap gap-3">
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">#RecommendationSystems</span>
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">#MachineLearning</span>
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">#Python</span>
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">#DataScience</span>
            </div>
          </div>
        </div>
      `,
      date: '2024-12-10',
      readTime: '15 min read',
      category: 'Data Science',
      image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Python', 'Recommendation Systems', 'Machine Learning', 'Data Science', 'Collaborative Filtering'],
      mediumUrl: 'https://medium.com/@mahesh-chitikeshi'
    }
  ];

  const [selectedPost, setSelectedPost] = React.useState(null);
  const [activeCategory, setActiveCategory] = React.useState('All');

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Show only 2 posts by default, or all if expanded
  const displayedPosts = showAllPosts 
    ? filteredPosts 
    : filteredPosts.slice(0, 2);

  const hasMorePosts = filteredPosts.length > 2;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Machine Learning': Brain,
      'Data Science': Target,
      'Computer Vision': Eye,
      'AI Applications': Lightbulb,
      'Deep Learning': Zap
    };
    return icons[category] || BookOpen;
  };

  // Function to increment views when post is clicked
  const handlePostClick = (post) => {
    setSelectedPost(post);
    // Increment view count only when clicked
    setPostViews(prevViews => {
      const newViews = {
        ...prevViews,
        [post.id]: (prevViews[post.id] || 0) + 1
      };
      localStorage.setItem('blogPostViews', JSON.stringify(newViews));
      return newViews;
    });
  };

  // Function to close modal and go back
  const handleBackToList = () => {
    setSelectedPost(null);
  };

  return (
    <section id="blog" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
            Tech Blog
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-3 leading-relaxed">
            Sharing insights, tutorials, and thoughts on AI, machine learning, and software development.
          </p>
          
          {/* Medium Link */}
          <div className="mt-4 sm:mt-6">
            <a
              href="https://medium.com/@mahesh-chitikeshi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 text-sm sm:text-base group"
            >
              <span>Also published on</span>
              <span className="font-semibold group-hover:underline">Medium</span>
              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 px-2">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category);
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setShowAllPosts(false); // Reset to show only 2 when changing category
                }}
                className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm md:text-base touch-manipulation ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {displayedPosts.map((post, index) => (
            <article
              key={post.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 group cursor-pointer ${
                post.featured ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
              } ${
                index >= 2 && !showAllPosts ? 'animate-fade-in' : ''
              }`}
              onClick={() => handlePostClick(post)}
              style={{
                animationDelay: index >= 2 ? `${(index - 2) * 0.1}s` : '0s'
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex flex-col space-y-1 sm:space-y-2">
                  {post.featured && (
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                      <Brain className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span>Featured</span>
                    </div>
                  )}
                  <span className="bg-blue-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 bg-black/50 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs flex items-center space-x-1">
                  <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span className="font-medium">{postViews[post.id] || 0}</span>
                </div>
              </div>

              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-xs sm:text-sm flex items-center space-x-1 group-hover:underline">
                    <span>Read More</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                    <Eye className="h-3 w-3" />
                    <span className="font-medium">{postViews[post.id] || 0} views</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMorePosts && (
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={() => setShowAllPosts(!showAllPosts)}
              className="group inline-flex items-center space-x-2 sm:space-x-3 bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 touch-manipulation text-sm sm:text-base"
            >
              {showAllPosts ? (
                <>
                  <span>Show Less Posts</span>
                  <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform" />
                  <span>Show More Posts ({filteredPosts.length - 2} more)</span>
                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
            
            {!showAllPosts && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-3">
                Showing {displayedPosts.length} of {filteredPosts.length} posts
              </p>
            )}
          </div>
        )}

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-40 sm:h-48 md:h-64 object-cover"
                />
                
                {/* Fixed Header with Proper Alignment */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-start">
                  <div className="flex flex-col space-y-2">
                    {/* Back Button */}
                    <button
                      onClick={handleBackToList}
                      className="flex items-center space-x-2 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white px-3 py-2 rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all duration-200 text-sm font-medium touch-manipulation group shadow-lg backdrop-blur-sm"
                    >
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                      <span>Back to Posts</span>
                    </button>
                    
                    {/* Badges */}
                    <div className="flex flex-col space-y-1">
                      {selectedPost.featured && (
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                          <Brain className="h-3 w-3" />
                          <span>Featured Article</span>
                        </div>
                      )}
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg w-fit">
                        {selectedPost.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Close Button - Fixed Alignment */}
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="w-10 h-10 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 touch-manipulation hover:scale-110 flex items-center justify-center shadow-lg backdrop-blur-sm"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-6">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{formatDate(selectedPost.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="font-medium">
                      {postViews[selectedPost.id] ? postViews[selectedPost.id].toLocaleString() : '0'} views
                    </span>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                  {selectedPost.title}
                </h1>

                <div className="prose max-w-none mb-4 sm:mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                </div>

                <div className="border-t dark:border-gray-700 pt-4 sm:pt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">Tags:</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medium Link Section */}
                {selectedPost.mediumUrl && (
                  <div className="mt-6 sm:mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 sm:p-6 border border-green-200 dark:border-green-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base flex items-center">
                      <span className="mr-2">📖</span>
                      Also Available on Medium
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                      Read this article and more on my Medium publication for a wider reach and community engagement.
                    </p>
                    <a
                      href={selectedPost.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium touch-manipulation group"
                    >
                      <span>Read on Medium</span>
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                )}

                {/* Engagement Section */}
                <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">Enjoyed this article?</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                    Have questions or want to discuss this topic further? I'd love to hear your thoughts and help you on your AI/ML journey!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <a
                      href="#contact"
                      onClick={handleBackToList}
                      className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm touch-manipulation"
                    >
                      <span>Get in Touch</span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                    <button 
                      onClick={handleBackToList}
                      className="inline-flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm touch-manipulation"
                    >
                      <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Back to Blog</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Stats - Updated with Real-time Views */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-slate-800 via-gray-900 to-black rounded-2xl p-4 sm:p-6 md:p-8 text-white border border-gray-700">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Blog Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400">{blogPosts.length}</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base">Articles Published</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400">
                {Object.values(postViews).reduce((sum, views) => sum + views, 0)}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base">Total Views</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400">
                {Math.round(blogPosts.reduce((sum, post) => sum + parseInt(post.readTime), 0) / blogPosts.length)}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base">Avg Read Time (min)</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-blue-400">{categories.length - 1}</div>
              <div className="text-gray-300 text-xs sm:text-sm md:text-base">Categories</div>
            </div>
          </div>
          
          {/* Real-time indicator */}
          <div className="mt-4 sm:mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-600/20 text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live view tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;