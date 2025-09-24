(function () {
  "use strict";

  // Configuration
  var API_BASE = "https://common-ad-network.vercel.app"; // Change this to your domain

  // Default styles
  var defaultStyles = {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    container: {
      maxWidth: "400px",
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.2s ease",
      cursor: "pointer",
      textDecoration: "none",
      display: "block",
    },
    containerHover: {
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      border: "none",
    },
    content: {
      padding: "16px",
    },
    headline: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "8px",
      lineHeight: "1.4",
    },
    description: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "12px",
      lineHeight: "1.4",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    company: {
      fontSize: "12px",
      color: "#9ca3af",
      fontWeight: "500",
    },
    badge: {
      fontSize: "10px",
      color: "#6b7280",
      backgroundColor: "#f3f4f6",
      padding: "2px 6px",
      borderRadius: "4px",
    },
  };

  function applyStyles(element, styles) {
    for (var property in styles) {
      if (styles.hasOwnProperty(property)) {
        element.style[property] = styles[property];
      }
    }
  }

  function createAdElement(adData) {
    // Create container
    var container = document.createElement("a");
    container.href = adData.clickUrl;
    container.target = "_blank";
    container.rel = "noopener noreferrer";
    applyStyles(container, defaultStyles.container);

    // Add hover effect
    container.addEventListener("mouseenter", function () {
      applyStyles(container, defaultStyles.containerHover);
    });

    container.addEventListener("mouseleave", function () {
      container.style.boxShadow = defaultStyles.container.boxShadow;
    });

    // Create image
    var image = document.createElement("img");
    image.src = adData.imageUrl;
    image.alt = adData.headline;
    applyStyles(image, defaultStyles.image);

    // Handle image load error
    image.onerror = function () {
      image.style.display = "none";
    };

    // Create content container
    var content = document.createElement("div");
    applyStyles(content, defaultStyles.content);

    // Create headline
    var headline = document.createElement("h3");
    headline.textContent = adData.headline;
    applyStyles(headline, defaultStyles.headline);

    // Create description
    var description = document.createElement("p");
    description.textContent = adData.description;
    applyStyles(description, defaultStyles.description);

    // Create footer
    var footer = document.createElement("div");
    applyStyles(footer, defaultStyles.footer);

    // Create company name
    var company = document.createElement("span");
    company.textContent = adData.companyName;
    applyStyles(company, defaultStyles.company);

    // Create badge
    var badge = document.createElement("span");
    badge.textContent = "Common Ad";
    applyStyles(badge, defaultStyles.badge);

    // Assemble elements
    footer.appendChild(company);
    footer.appendChild(badge);

    content.appendChild(headline);
    content.appendChild(description);
    content.appendChild(footer);

    container.appendChild(image);
    container.appendChild(content);

    return container;
  }

  function createClusterContainer(adsPerCluster) {
    var cluster = document.createElement("div");
    cluster.style.display = "grid";
    cluster.style.gap = "16px";

    if (adsPerCluster === 1) {
      cluster.style.gridTemplateColumns = "1fr";
    } else if (adsPerCluster === 2) {
      cluster.style.gridTemplateColumns = "1fr 1fr";
      cluster.style.maxWidth = "832px"; // 2 * 400px + 32px gap
    } else if (adsPerCluster === 3) {
      cluster.style.gridTemplateColumns = "1fr 1fr 1fr";
      cluster.style.maxWidth = "1264px"; // 3 * 400px + 64px gap
    } else if (adsPerCluster === 4) {
      cluster.style.gridTemplateColumns = "1fr 1fr";
      cluster.style.maxWidth = "832px";
    }

    return cluster;
  }

  function loadAdCluster(containerId, siteId, options) {
    options = options || {};
    var container = document.getElementById(containerId);
    var adsPerCluster = parseInt(options.adsPerCluster) || 1;

    if (!container) {
      console.error(
        "Common Ad Network: Container element not found: " + containerId
      );
      return;
    }

    if (!siteId) {
      console.error("Common Ad Network: Site ID is required");
      return;
    }

    // Validate cluster limits
    if (adsPerCluster < 1 || adsPerCluster > 4) {
      console.error("Common Ad Network: adsPerCluster must be between 1 and 4");
      return;
    }

    // Check page-wide cluster limit
    var existingClusters = document.querySelectorAll(
      "[data-common-ad-cluster]"
    ).length;
    if (existingClusters >= 3) {
      console.error(
        "Common Ad Network: Maximum 3 ad clusters per page allowed"
      );
      return;
    }

    // Mark this container as a cluster
    container.setAttribute("data-common-ad-cluster", "true");

    // Show loading state
    container.innerHTML =
      '<div style="padding: 20px; text-align: center; color: #9ca3af; font-family: ' +
      defaultStyles.fontFamily +
      ';">Loading ads...</div>';

    // Create cluster container
    var cluster = createClusterContainer(adsPerCluster);

    // Apply custom width if specified
    if (options.width) {
      cluster.style.maxWidth = options.width;
    }

    var loadedAds = 0;
    var adElements = [];

    function loadSingleAd(index) {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        API_BASE +
          "/api/embed/ad?site=" +
          encodeURIComponent(siteId) +
          "&cluster=" +
          encodeURIComponent(containerId) +
          "&index=" +
          index
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              var adData = JSON.parse(xhr.responseText);
              var adElement = createAdElement(adData);
              adElements[index] = adElement;
              loadedAds++;

              // Track impression
              if (typeof window.gtag === "function") {
                window.gtag("event", "ad_impression", {
                  event_category: "Common Ad Network",
                  event_label: adData.id,
                });
              }

              // If all ads loaded, display the cluster
              if (loadedAds === adsPerCluster) {
                container.innerHTML = "";
                for (var i = 0; i < adElements.length; i++) {
                  if (adElements[i]) {
                    cluster.appendChild(adElements[i]);
                  }
                }
                container.appendChild(cluster);
              }
            } catch (error) {
              console.error("Common Ad Network: Error parsing ad data", error);
              loadedAds++;
              if (loadedAds === adsPerCluster) {
                container.innerHTML =
                  '<div style="padding: 20px; text-align: center; color: #ef4444; font-family: ' +
                  defaultStyles.fontFamily +
                  ';">Failed to load ads</div>';
              }
            }
          } else {
            console.error("Common Ad Network: Failed to fetch ad", xhr.status);
            loadedAds++;
            if (loadedAds === adsPerCluster) {
              container.innerHTML =
                '<div style="padding: 20px; text-align: center; color: #ef4444; font-family: ' +
                defaultStyles.fontFamily +
                ';">Failed to load ads</div>';
            }
          }
        }
      };
      xhr.send();
    }

    // Load all ads in the cluster
    for (var i = 0; i < adsPerCluster; i++) {
      loadSingleAd(i);
    }
  }

  function loadAd(containerId, siteId, options) {
    options = options || {};

    // If adsPerCluster is specified, use cluster loading
    if (options.adsPerCluster && parseInt(options.adsPerCluster) > 1) {
      return loadAdCluster(containerId, siteId, options);
    }

    var container = document.getElementById(containerId);

    if (!container) {
      console.error(
        "Common Ad Network: Container element not found: " + containerId
      );
      return;
    }

    if (!siteId) {
      console.error("Common Ad Network: Site ID is required");
      return;
    }

    // Show loading state
    container.innerHTML =
      '<div style="padding: 20px; text-align: center; color: #9ca3af; font-family: ' +
      defaultStyles.fontFamily +
      ';">Loading ad...</div>';

    // Fetch ad
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      API_BASE + "/api/embed/ad?site=" + encodeURIComponent(siteId)
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var adData = JSON.parse(xhr.responseText);
            var adElement = createAdElement(adData);

            // Apply custom width if specified
            if (options.width) {
              adElement.style.maxWidth = options.width;
            }

            container.innerHTML = "";
            container.appendChild(adElement);

            // Track impression
            if (typeof window.gtag === "function") {
              window.gtag("event", "ad_impression", {
                event_category: "Common Ad Network",
                event_label: adData.id,
              });
            }
          } catch (error) {
            console.error("Common Ad Network: Error parsing ad data", error);
            container.innerHTML =
              '<div style="padding: 20px; text-align: center; color: #ef4444; font-family: ' +
              defaultStyles.fontFamily +
              ';">Failed to load ad</div>';
          }
        } else {
          console.error("Common Ad Network: Failed to fetch ad", xhr.status);
          container.innerHTML =
            '<div style="padding: 20px; text-align: center; color: #ef4444; font-family: ' +
            defaultStyles.fontFamily +
            ';">Failed to load ad</div>';
        }
      }
    };
    xhr.send();
  }

  // Global API
  window.CommonAdNetwork = {
    loadAd: loadAd,
    loadAdCluster: loadAdCluster,
    version: "1.1.0",
  };

  // Auto-initialize ads with data attributes
  // meant to be run after DOMContentLoaded, like using lazyOnLoad strategy in Next.js
  // document.addEventListener('DOMContentLoaded', function() {
  var autoAds = document.querySelectorAll("[data-common-ad]");
  var clusterCount = 0;

  for (var i = 0; i < autoAds.length; i++) {
    var element = autoAds[i];
    var siteId = element.getAttribute("data-site-id");
    var width = element.getAttribute("data-width");
    var adsPerCluster = element.getAttribute("data-ads-per-cluster");

    if (siteId) {
      // Check cluster limits
      if (adsPerCluster && parseInt(adsPerCluster) > 1) {
        if (clusterCount >= 3) {
          console.error(
            "Common Ad Network: Maximum 3 ad clusters per page allowed"
          );
          continue;
        }
        if (parseInt(adsPerCluster) > 4) {
          console.error("Common Ad Network: Maximum 4 ads per cluster allowed");
          continue;
        }
        clusterCount++;
      }

      loadAd(element.id || "common-ad-" + i, siteId, {
        width: width,
        adsPerCluster: adsPerCluster,
      });
    }
  }
  // });
})();
