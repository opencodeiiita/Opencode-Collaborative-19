t = readtable('./data.csv');
 plot(t.Weeks,t.OC,'LineWidth',3);

hold on;
plot(t.Weeks,t.LAP,'LineWidth',3);
hold on;
plot(t.Weeks,t.SCSS,'LineWidth',3);
hold on;
plot(t.Weeks,t.HS,'LineWidth',3);
ylabel("Commits in the repository");
xlabel("Weeks");