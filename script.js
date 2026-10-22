  const menu = document.querySelector(".menu");
    const nav = document.querySelector("nav");

    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");

      menu.setAttribute("aria-expanded", String(open));
      menu.textContent = open ? "Жабу ×" : "Мәзір ☰";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
        menu.textContent = "Мәзір ☰";
      });
    });

    const guide = document.querySelector("#guide");
    const startButton = document.querySelector("#start");
    const closeButton = document.querySelector(".close");

    startButton.addEventListener("click", () => {
      guide.showModal();
    });

    closeButton.addEventListener("click", () => {
      guide.close();
    });

    guide.addEventListener("click", (event) => {
      if (event.target === guide) {
        const rect = guide.getBoundingClientRect();

        const outside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;

        if (outside) {
          guide.close();
        }
      }
    });

    const tabs = [...document.querySelectorAll('[role="tab"]')];

    function selectTab(selectedTab) {
      tabs.forEach((tab) => {
        const active = tab === selectedTab;

        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;

        const panelId = tab.getAttribute("aria-controls");
        document.getElementById(panelId).hidden = !active;
      });
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        selectTab(tab);
      });

      tab.addEventListener("keydown", (event) => {
        const allowedKeys = [
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End"
        ];

        if (!allowedKeys.includes(event.key)) {
          return;
        }

        event.preventDefault();

        let nextTab;

        if (event.key === "Home") {
          nextTab = tabs[0];
        } else if (event.key === "End") {
          nextTab = tabs[tabs.length - 1];
        } else {
          nextTab = tabs[(index + 1) % tabs.length];
        }

        selectTab(nextTab);
        nextTab.focus();
      });
    });

    function updateProgress() {
      const page = document.documentElement;

      const percent =
        page.scrollHeight === page.clientHeight
          ? 0
          : (
              page.scrollTop /
              (page.scrollHeight - page.clientHeight)
            ) * 100;

      document.querySelector(".progress").style.width =
        percent + "%";
    }

    window.addEventListener("scroll", updateProgress, {
      passive: true
    });

    updateProgress();