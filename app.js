function attackValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            log: [],
        };
    },
    watch: {
        playerHealth(val) {
            if (val <= 0 && this.monsterHealth <= 0) {
                // drwa
                this.winner = "تعادل";
            } else if (val <= 0) {
                // lost
                this.winner = "الوحش";
            }
        },
        monsterHealth(val) {
            if (val <= 0 && this.playerHealth <= 0) {
                // drwa
                this.winner = "تعادل";
            } else if (val <= 0) {
                // lost
                this.winner = "انت";
            }
        },
    },
    methods: {
        reloadPage() {
            location.reload();
        },
        attackMonster() {
            this.currentRound++;
            const myAttackValue = attackValue(5, 12);
            this.monsterHealth -= myAttackValue;
            this.attackPlayer();
            this.gameLog("انت", "هاجمت علي الوحش", myAttackValue);
        },
        attackPlayer() {
            const myAttackValue = attackValue(8, 12);
            this.playerHealth -= myAttackValue;
            this.gameLog("الوحش", "هاجمك", myAttackValue);
        },
        spicalAttackMonster() {
            this.currentRound++;
            const myAttackValue = attackValue(10, 25);
            this.monsterHealth -= myAttackValue;
            this.attackPlayer();
            this.gameLog("انت", "هاجمت هجمه معززه", myAttackValue);
        },
        healPlayer() {
            this.currentRound++;

            const healValue = attackValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.gameLog("انت", "عززت طاقتك", healValue);
        },
        gameLog(who, what, value) {
            this.log.unshift({
                whoAttack: who,
                whatHappen: what,
                whatVal: value,
            });
        },
    },
});

app.mount("#game");