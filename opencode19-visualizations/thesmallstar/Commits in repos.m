url = ['https://api.github.com/repos/GeekHaven/Leave-Application-Portal/stats/participation'];
S = webread(url);
plot(S.all,'linewidth',3);
xlim([47 52]);
hold on;
url = ['https://api.github.com/repos/opencodeiiita/sassy-css/stats/participation'];
S = webread(url);
plot(S.all,'linewidth',3);
hold on;  
url = ['https://api.github.com/repos/opencodeiiita/HackerSkills/stats/participation'];
S = webread(url);
plot(S.all,'linewidth',3);
hold on;
url = ['https://api.github.com/repos/opencodeiiita/Opencode-Collaborative-19/stats/participation'];
S = webread(url);
plot(S.all,'linewidth',3);
hold on;
xlabel("Week- 48: week 1");
ylabel("Number of commits");




