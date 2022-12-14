const button = (function () {
    const createRipple = (event,button) => {
        const btnRect = button.getBoundingClientRect();

        const circle = document.createElement("span");
        const diameter = Math.max(btnRect.width, btnRect.height);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - btnRect.left - radius}px`;
        circle.style.top = `${event.clientY - btnRect.top - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) ripple.remove();

        button.appendChild(circle);
    };

   
    document.addEventListener("mousedown", (event) => {
        const button = event.target.closest(".btn");
        if (!button) return;
        createRipple(event,button)
    });
    document.addEventListener("keydown", (event) => {
        const button = event.target.closest(".btn");
        if (!button) return;
        if (event.type === "keydown" && event.keyCode !== 32) return;
        createRipple(event,button)
    });
})();
