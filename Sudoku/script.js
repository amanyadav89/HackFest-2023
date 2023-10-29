document.addEventListener('DOMContentLoaded', function() {
    const dino = document.getElementById('dino');
    const obstacle = document.getElementById('obstacle');

    let isJumping = false;

    function jump() {
        if (!isJumping) {
            isJumping = true;
            let position = 0;
            const jumpInterval = setInterval(() => {
                if (position === 100) {
                    clearInterval(jumpInterval);
                    const fallInterval = setInterval(() => {
                        if (position === 0) {
                            clearInterval(fallInterval);
                            isJumping = false;
                        } else {
                            position -= 10;
                            dino.style.bottom = position + 'px';
                        }
                    }, 20);
                } else {
                    position += 10;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }
    }

    function moveObstacle() {
        let position = 300;
        const obstacleInterval = setInterval(() => {
            if (position === -30) {
                clearInterval(obstacleInterval);
                obstacle.style.right = '300px';
                moveObstacle();
            } else {
                position -= 10;
                obstacle.style.right = position + 'px';
            }
        }, 20);
    }

    function checkCollision() {
        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        return (
            dinoRect.bottom > obstacleRect.top &&
            dinoRect.right > obstacleRect.left &&
            dinoRect.left < obstacleRect.right
        );
    }

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) { // Space key
            jump();
        }
    });

    function gameLoop() {
        moveObstacle();
        const obstaclePosition = parseInt(window.getComputedStyle(obstacle).right);
        if (obstaclePosition > 0 && obstaclePosition < 50) {
            if (checkCollision()) {
                alert('Game Over! You collided with the obstacle.');
                location.reload(); // Restart the game
            }
        }
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
