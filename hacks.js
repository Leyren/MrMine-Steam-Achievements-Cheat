
shortcut.add("y", async function ()
{
    if (!isGameLoaded) return;
    for (var i = 0; i < questManager.quests.length; i++) {
        var q = questManager.quests[i]
        if (!q.isComplete) {
            q.markComplete();
            if (!mutebuttons) questCompleteAudio.play();
            if (q.onComplete != null) {
                q.onComplete();
            }
            if (isSteam() && q.steamAchievementId != "") {
                platform.grantAchievement(q.steamAchievementId);
                trackeEvent_completedQuest(q.id);
            }
            newNews(_("Hacked quest " + q.id + " " + q.name), true);
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    newNews(_("No quests left to complete"), true);
}, {
    'type': 'keyup',
    'target': document,
    'disable_in_input': true
})

