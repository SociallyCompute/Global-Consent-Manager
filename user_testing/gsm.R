library(lsmeans)
library(ggplot2)
library(dplyr)
library(ggrepel)

gsm <- read.csv(file="./times-by-treatment.csv")
summary(gsm)
pairwise.t.test(gsm$Seconds, gsm$Group,  p.adj = "bonferroni")
t.test(gsm$Seconds ~ gsm$Group)
TukeyHSD(aov(Seconds ~ gsm$Group, gsm))

gsm2 <- subset(gsm, ID != 3)
pairwise.t.test(gsm2$Seconds, gsm2$Group,  p.adj = "bonferroni")
t.test(gsm2$Seconds ~ gsm2$Group)
TukeyHSD(aov(Seconds ~ gsm2$Group, gsm2))

ggplot(gsm2, aes(x = Group, y = Seconds)) +
  geom_point()

gd <- gsm2 %>%
  group_by(Group) %>%
  summarise(Seconds = mean(Seconds))
gd

ggplot(gsm2, aes(x = Group, y = Seconds)) +
  geom_point() +
  geom_bar(data = gd, stat = "identity", alpha = .3)

ggplot(gsm2, aes(x = Group, y = Seconds, color = Group, fill = Group)) +
  geom_bar(data = gd, stat = "identity", alpha = .3) +
  ggrepel::geom_text_repel(aes(label = ID), color = "black", size = 2.5, segment.color = "grey") +
  geom_point() +
  guides(color = "none", fill = "none") +
  theme_bw() +
  labs(
    title = "Global Consent Manager User Study",
    x = "Treatment Group",
    y = "Seconds of Engagement"
  )
