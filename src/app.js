const express = require('express');
const chalk = require('chalk');
const githubRoutes = require('./routes/githubRoutes');

const app = express();
app.use(express.json());

app.use('/api/github', githubRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.green(`Server running on port ${PORT}`));
});
