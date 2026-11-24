// import Header from "../../components/layout/Header";

// export default function RefundPolicyPage() {
//     return (
//         <>
//             <Header />
//             <main className="wrap pb-24 pt-40">
//                 <h1 className="t-xl">Refund Policy</h1>
//                 <p className="mt-8">Demo page. Content coming soon.</p>
//             </main>
//         </>
//     );
// }


import { useEffect } from "react";



const css = `
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap");
body{margin:0;background:#F5F6F8}
a{color:inherit}
a:focus-visible{outline:3px solid #F5EA3B;outline-offset:3px;border-radius:6px}
.sec{border-bottom:1px solid rgba(10,31,68,0.1);padding:80px 0}
.sec.first{padding-top:0}
.h2{margin:0 0 36px;font-size:clamp(38px,5vw,58px);font-weight:500;line-height:1.04;letter-spacing:-0.045em;color:#0A1F44;text-wrap:balance}
.num{margin-right:10px;font-size:16px;font-weight:600;letter-spacing:0.12em;color:rgba(10,31,68,0.4)}
.body{display:flex;flex-direction:column;gap:26px;font-size:23px;line-height:1.75;color:rgba(10,31,68,0.78)}
.body p{margin:0}
.h3{margin:0 0 18px;font-size:28px;font-weight:600;color:#0A1F44}
.hl{background:rgba(245,234,59,0.38);border:1px solid rgba(245,234,59,0.75);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);padding:2px 8px;border-radius:8px;font-weight:600;color:#0A1F44;transition:background .3s}.hl:hover{background:rgba(245,234,59,0.65)}
.hl2{background:rgba(245,234,59,0.3);border:1px solid rgba(245,234,59,0.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);padding:1px 7px;border-radius:8px;color:#0A1F44;transition:background .3s}.hl2:hover{background:rgba(245,234,59,0.6)}
.lnk{font-weight:600;text-decoration:underline;text-decoration-color:rgba(10,31,68,0.3);text-underline-offset:4px;color:#0A1F44}
.lnk:hover{text-decoration-color:#0A1F44}
.mini{background:rgba(255,255,255,0.75);border:1px solid rgba(10,31,68,0.1);border-radius:20px;padding:40px 32px;transition:transform .3s,background .3s,box-shadow .3s}
.mini:hover{transform:translateY(-4px);background:rgba(230,242,90,0.2);box-shadow:0 12px 30px rgba(10,31,68,0.08)}
.navlink{display:flex;align-items:center;gap:16px;border-radius:14px;padding:20px 18px;font-size:19px;line-height:1.25;color:rgba(10,31,68,0.68);text-decoration:none}
.navlink:hover{background:rgba(10,31,68,0.05);color:#0A1F44}
.navlink.on{background:#0A1F44;color:#F5F6F8}
.navlink .n{font-size:14px;opacity:0.6}
.hcard{transition:transform .3s,background .3s}
.hcard:hover{transform:translateY(-4px);background:rgba(230,242,90,0.1)!important}
.pill:hover{background:#050B1A}
@media (prefers-reduced-motion:reduce){.mini,.hcard{transition:none}.mini:hover,.hcard:hover{transform:none}}
`;

export default function RefundPolicyPreview() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return undefined;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity .8s ease, transform .8s ease";
    });
    const reveal = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => reveal(entry.target as HTMLElement), i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    const safety = setTimeout(() => els.forEach(reveal), 3000);
    return () => {
      clearTimeout(safety);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <div style={{ fontFamily: "'Manrope',system-ui,sans-serif", color: "#0A1F44", background: "#F5F6F8", lineHeight: "1.6" }}>
      
        
        <section style={{ position: "relative", overflow: "hidden", background: "#050B1A", color: "#F5F6F8" }}>
          <div style={{ position: "absolute", inset: "0", background: "radial-gradient(ellipse 60% 70% at 85% 0%,rgba(143,163,194,0.18),transparent 70%),radial-gradient(ellipse 40% 50% at 0% 100%,rgba(230,242,90,0.07),transparent 70%)" }}></div>
      
          <header style={{ position: "relative", maxWidth: "1400px", margin: "0 auto", padding: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <a href="#top" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "#F5F6F8" }}>
              <svg width="32" height="32" viewBox="0 0 34 34" fill="none" aria-hidden="true"><path d="M27.5 9.2A13 13 0 1 0 30 17" stroke="#F5EA3B" strokeWidth="4.5" strokeLinecap="round"/><circle cx="27.8" cy="8.2" r="3" fill="#F5EA3B"/></svg>
              <span style={{ fontWeight: "700", fontSize: "21px", letterSpacing: "-0.03em" }}>Unbound Xebaq</span>
            </a>
            <a href="https://calendly.com/zebaq/30min" style={{ fontWeight: "600", fontSize: "14px", textDecoration: "none", color: "#F5F6F8", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px", padding: "10px 20px" }}>Book a call</a>
          </header>
      
          <div id="top" style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "88px 32px 104px" }}>
            <p style={{ margin: "0", fontSize: "17px", fontWeight: "600", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8FA3C2" }}>Legal / Policy</p>
            <h1 style={{ margin: "28px 0 0", maxWidth: "1100px", fontSize: "clamp(56px,10vw,136px)", fontWeight: "500", lineHeight: "0.92", letterSpacing: "-0.055em" }}>Refund Policy<span style={{ display: "inline-block", width: "0.14em", height: "0.14em", marginLeft: "0.06em", borderRadius: "50%", background: "#F5EA3B", boxShadow: "0 0 0 0.06em rgba(230,242,90,0.25)" }}></span></h1>
            <p style={{ margin: "32px 0 0", maxWidth: "780px", fontSize: "clamp(22px,2.4vw,30px)", lineHeight: "1.55", color: "#B9C9E0" }}>Understand how refunds and cancellations work for our web services, before you subscribe.</p>
      
            <div style={{ marginTop: "48px", maxWidth: "1336px", display: "flex", flexWrap: "wrap", gap: "1px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.1)", borderRadius: "18px", overflow: "hidden" }}>
              <div className="hcard" style={{ flex: "1 1 300px", position: "relative", background: "rgba(255,255,255,0.03)", padding: "52px 40px" }}>
                <div style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "1px", background: "linear-gradient(90deg,rgba(230,242,90,0.5),transparent)" }}></div>
                <p style={{ margin: "0", fontSize: "17px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F5EA3B" }}>Refund Window</p>
                <p style={{ margin: "22px 0 0", fontSize: "30px", fontWeight: "600", letterSpacing: "-0.02em" }}>First month</p>
                <p style={{ margin: "14px 0 0", fontSize: "19px", lineHeight: "1.6", color: "#8FA3C2" }}>Money-back guarantee for new clients</p>
              </div>
              <div className="hcard" style={{ flex: "1 1 300px", position: "relative", background: "rgba(255,255,255,0.03)", padding: "52px 40px" }}>
                <div style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "1px", background: "linear-gradient(90deg,rgba(230,242,90,0.5),transparent)" }}></div>
                <p style={{ margin: "0", fontSize: "17px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F5EA3B" }}>Cancellation</p>
                <p style={{ margin: "22px 0 0", fontSize: "30px", fontWeight: "600", letterSpacing: "-0.02em" }}>7-10 days</p>
                <p style={{ margin: "14px 0 0", fontSize: "19px", lineHeight: "1.6", color: "#8FA3C2" }}>From the date of service agreement</p>
              </div>
              <div className="hcard" style={{ flex: "1 1 300px", position: "relative", background: "rgba(255,255,255,0.03)", padding: "52px 40px" }}>
                <div style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "1px", background: "linear-gradient(90deg,rgba(230,242,90,0.5),transparent)" }}></div>
                <p style={{ margin: "0", fontSize: "17px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F5EA3B" }}>Refund Timing</p>
                <p style={{ margin: "22px 0 0", fontSize: "30px", fontWeight: "600", letterSpacing: "-0.02em" }}>5-7 business days</p>
                <p style={{ margin: "14px 0 0", fontSize: "19px", lineHeight: "1.6", color: "#8FA3C2" }}>To reflect in your bank account</p>
              </div>
            </div>
          </div>
        </section>
      
        
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "80px 32px", display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "center", alignItems: "flex-start" }}>
      
          <aside style={{ flex: "1 1 360px", maxWidth: "400px", minWidth: "0" }}>
            <nav aria-label="Refund policy sections" style={{ border: "1px solid rgba(10,31,68,0.1)", background: "rgba(255,255,255,0.45)", borderRadius: "26px", padding: "20px" }}>
              <p style={{ margin: "0", padding: "16px 18px 20px", fontSize: "15px", fontWeight: "600", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(10,31,68,0.55)" }}>On this page</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a className="navlink on" href="#refund"><span className="n">01</span><span>Refund Policy for Web Services</span></a>
                <a className="navlink" href="#cancellation"><span className="n">02</span><span>Cancellation Policy</span></a>
              </div>
            </nav>
            <a href="https://calendly.com/zebaq/30min" style={{ display: "block", marginTop: "20px", borderRadius: "26px", background: "#0A1F44", padding: "36px", color: "#F5F6F8", textDecoration: "none" }}>
              <p style={{ margin: "0", fontSize: "14px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#F5EA3B" }}>Need clarity?</p>
              <p style={{ margin: "12px 0 0", fontSize: "28px", fontWeight: "500", lineHeight: "1.2", letterSpacing: "-0.03em" }}>Ready for a consultation?</p>
              <p style={{ margin: "16px 0 0", fontSize: "17px", lineHeight: "1.55", color: "#B9C9E0" }}>Schedule a free call with our team.</p>
              <span style={{ marginTop: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "17px", fontWeight: "600" }}>Book a call
                <span style={{ display: "grid", placeItems: "center", width: "46px", height: "46px", borderRadius: "50%", background: "#F5EA3B", color: "#0A1F44" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></span>
              </span>
            </a>
          </aside>
      
          <article style={{ flex: "3 1 480px", maxWidth: "900px", minWidth: "0" }}>
      
            <section data-reveal id="refund" className="sec first">
              <h2 className="h2"><span className="num">01 / </span>Refund Policy for Web Services</h2>
              <div className="body">
                <p>Thanks for subscribing to our web services at <a className="lnk" href="https://zebaqweb.com/">zebaq</a> operated by Zebaq Pvt Ltd.</p>
                <p>We at Zebaq, feel that all clients have the right to test our service and judge for themselves. With that in mind, we offer new clients a <span className="hl">money back guarantee for the first month</span> only if they don't see any improvements in first month itself.</p>
                <p>However this refund policy becomes <span className="hl">void if subscribed package is a discounted package or opted with offer</span>.</p>
                <p>With the dynamism of digital market it's quite sceptical to give a quantified outcome, but with fresh technical strategy in place we can guarantee of improvement and expect our clients to understand the same.</p>
                <p>A continuation of campaign to second month makes us believe that client is pretty much convinced and satisfied with the work progress. This makes the <span className="hl2">refund policy void in 2nd month</span> of campaign progress. "It is the right of every client to have long-term, risk-free business relationship with us. That is why we stand by our words.</p>
                <p>For more details on refund policy and service coverage, please check our <a className="lnk" href="https://zebaqweb.com/terms-and-conditions">Terms and Conditions page.</a></p>
              </div>
              <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
                <div className="mini" style={{ flex: "1 1 240px" }}><p style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>Eligible</p><p style={{ margin: "12px 0 0", fontSize: "17px", lineHeight: "1.55", color: "rgba(10,31,68,0.68)" }}>New clients, first month only</p></div>
                <div className="mini" style={{ flex: "1 1 240px" }}><p style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>Void for</p><p style={{ margin: "12px 0 0", fontSize: "17px", lineHeight: "1.55", color: "rgba(10,31,68,0.68)" }}>Discounted or offer packages</p></div>
                <div className="mini" style={{ flex: "1 1 240px" }}><p style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>Void from</p><p style={{ margin: "12px 0 0", fontSize: "17px", lineHeight: "1.55", color: "rgba(10,31,68,0.68)" }}>The 2nd month of the campaign</p></div>
              </div>
            </section>
      
            <section data-reveal id="cancellation" className="sec" style={{ borderBottom: "none", paddingBottom: "0" }}>
              <h2 className="h2"><span className="num">02 / </span>Cancellation Policy</h2>
              <div className="body">
                <p>A subscriber can place the cancellation order for a particular service <span className="hl">within 7-10 days of service agreement</span> via prescribed cancellation form available on our website.</p>
                <p><span className="hl">No cancellation is possible</span> for the services offered with promotional discounts on special occasions . Independence Day, Christmas and New Year. These are limited edition offers and hence any range of refund would not be possible.</p>
                <p>In no case, ZEBAQ will entertain cancellation requests made for services such as <span className="hl2">domain name registration and domain name transfer</span>.</p>
                <p>To terminate any Subscription of the Service by the Client or Zebaq need to give <span className="hl">prior One month Notice</span>.</p>
                <p><span className="hl">Fee once paid will not be refunded in any case</span> even if the cancellation is posted within 12 hours.</p>
                <p>A service stands cancel if next payment is not received within 7 working days. After cancellation refunds take <span className="hl2">5-7 business days</span> to reflect in your bank account. For more details on refund policy and service coverage, please check our <a className="lnk" href="https://zebaqweb.com/terms-and-conditions">Terms and Conditions page.</a></p>
              </div>
              <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
                <div className="mini" style={{ flex: "1 1 240px" }}><p style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>7-10 days</p><p style={{ margin: "12px 0 0", fontSize: "17px", lineHeight: "1.55", color: "rgba(10,31,68,0.68)" }}>Window to place a cancellation order</p></div>
                <div className="mini" style={{ flex: "1 1 240px" }}><p style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>One month</p><p style={{ margin: "12px 0 0", fontSize: "17px", lineHeight: "1.55", color: "rgba(10,31,68,0.68)" }}>Prior notice to terminate a subscription</p></div>
                <div className="mini" style={{ flex: "1 1 240px" }}><p style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>5-7 business days</p><p style={{ margin: "12px 0 0", fontSize: "17px", lineHeight: "1.55", color: "rgba(10,31,68,0.68)" }}>For refunds to reach your bank account</p></div>
              </div>
              <p style={{ margin: "40px 0 0", fontSize: "14px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(10,31,68,0.6)" }}>Cannot be cancelled</p>
              <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <span style={{ border: "1px solid rgba(10,31,68,0.15)", borderRadius: "999px", padding: "14px 26px", fontSize: "18px", fontWeight: "500", color: "rgba(10,31,68,0.75)" }}>Promotional offers: Independence Day, Christmas, New Year</span>
                <span style={{ border: "1px solid rgba(10,31,68,0.15)", borderRadius: "999px", padding: "14px 26px", fontSize: "18px", fontWeight: "500", color: "rgba(10,31,68,0.75)" }}>Domain name registration</span>
                <span style={{ border: "1px solid rgba(10,31,68,0.15)", borderRadius: "999px", padding: "14px 26px", fontSize: "18px", fontWeight: "500", color: "rgba(10,31,68,0.75)" }}>Domain name transfer</span>
              </div>
            </section>
          </article>
        </div>
      
        
        <section style={{ borderTop: "1px solid rgba(10,31,68,0.1)", background: "#F5F6F8", padding: "96px 24px 112px" }}>
          <div style={{ position: "relative", overflow: "hidden", maxWidth: "1320px", margin: "0 auto", borderRadius: "44px", background: "#DCE7F5", padding: "112px 40px", textAlign: "center", boxShadow: "0 24px 70px rgba(10,31,68,0.1)" }}>
            <div style={{ position: "absolute", left: "-112px", top: "50%", width: "520px", height: "520px", marginTop: "-260px", borderRadius: "50%", border: "1px solid rgba(10,31,68,0.06)" }}><div style={{ position: "absolute", inset: "48px", borderRadius: "50%", border: "1px solid rgba(10,31,68,0.05)" }}></div><div style={{ position: "absolute", inset: "96px", borderRadius: "50%", border: "1px solid rgba(10,31,68,0.045)" }}></div></div>
            <div style={{ position: "absolute", right: "-112px", top: "50%", width: "520px", height: "520px", marginTop: "-260px", borderRadius: "50%", border: "1px solid rgba(10,31,68,0.06)" }}><div style={{ position: "absolute", inset: "48px", borderRadius: "50%", border: "1px solid rgba(10,31,68,0.05)" }}></div><div style={{ position: "absolute", inset: "96px", borderRadius: "50%", border: "1px solid rgba(10,31,68,0.045)" }}></div></div>
            <div style={{ position: "relative", maxWidth: "880px", margin: "0 auto" }}>
              <p style={{ margin: "0", fontSize: "17px", fontWeight: "600", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(10,31,68,0.72)" }}>For marketing &amp; development agencies</p>
              <h2 style={{ margin: "28px 0 0", fontSize: "clamp(46px,7.5vw,96px)", fontWeight: "500", lineHeight: "0.98", letterSpacing: "-0.055em", textWrap: "balance" }}>Ready to Accelerate Your Business <span style={{ color: "#857A00" }}>Growth</span><span style={{ display: "inline-block", width: "0.14em", height: "0.14em", marginLeft: "0.06em", borderRadius: "50%", background: "#0A1F44" }}></span></h2>
              <p style={{ margin: "32px auto 0", maxWidth: "900px", fontSize: "clamp(20px,2.1vw,26px)", lineHeight: "1.7", color: "rgba(10,31,68,0.7)" }}>Your business has incredible potential—let’s unlock it together. Schedule a call with our team, and we’ll work with you to build a tailored growth plan that aligns with your goals and vision.</p>
              <a className="pill" href="https://calendly.com/zebaq/30min" style={{ marginTop: "52px", display: "inline-flex", alignItems: "center", gap: "20px", minHeight: "72px", padding: "0 14px 0 40px", borderRadius: "999px", background: "#0A1F44", color: "#F5F6F8", fontSize: "21px", fontWeight: "600", textDecoration: "none" }}>Book Your Free Consultation
                <span style={{ display: "grid", placeItems: "center", width: "48px", height: "48px", borderRadius: "50%", background: "#F5EA3B", color: "#0A1F44" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
