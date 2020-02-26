new Vue({
    el: "#app",
    data: {
        userName : '',
        enemyName : 'Draconis',
        gameStarted : false,
        showError: false,
        userHP: 100,
        enemyHP: 100,
        userDamage: 0,
        enemyDamage: 0,
        userHealing: 10,
        playerHealingMax: 3,
        fight: false,
        attacking: false,
        healing: false,
        score: {
            enemy: 0,
            user: 0
        }
    },
    methods: {
        startGame: function(){
            if(this.userName.length >= 2){
                this.gameStarted = true;
            } else{
                this.showError = true;
            }
        },
        changeName: function(){
            this.userName = '';
            this.restartGame();
            this.score.enemy = 0;
            this.score.user = 0;
            this.gameStarted = false;
        },
        startFight: function(){
            this.fight = true;
            this.attacking = true;
            var vm = this;
            setTimeout(function(){vm.attacking = false;}, 300);

            var damage = this.calculateDamage(3,10);
            this.enemyHP -= damage;
            this.enemyDamage = damage;
            
            if(this.enemyHP <= 0){
                alert('Congratz! You Won');
                this.restartGame();
                this.score.user ++;
                return;
            }

            var damage = this.calculateDamage(5,13);
            this.userHP -= damage;
            this.userDamage = damage;

            if(this.userHP <= 0){
                alert('Oh so sad! You lost :(');
                this.restartGame();
                this.score.enemy ++;
                return;
            }

        },
        heal: function(){
            if(this.userHP < 90 && this.playerHealingMax > 0){
                this.userHP += 10;
                this.playerHealingMax --;
                this.healing = true;
                var vm = this;
                setTimeout(function(){vm.healing = false;}, 300);
            }
        },
        calculateDamage: function(min, max){
            return Math.max((Math.floor(Math.random() * max) + 1), min);
        },
        restartGame: function(){
            this.enemyHP = 100;
            this.userHP = 100;
            this.playerHealingMax = 3;
            this.fight = false;
        }
    }
});