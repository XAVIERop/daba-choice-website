import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background font-sans">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 rounded-3xl border border-white/5"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 gold-gradient-text">TERMS OF <span className="text-white">SERVICE</span></h1>
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">2. Ordering & Payment</h2>
              <p>
                Daba Choice processes orders via WhatsApp. All prices listed are in AED (United Arab Emirates Dirham). We accept Cash on Delivery and other payment methods as coordinated via WhatsApp. We reserve the right to refuse service or cancel orders at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">3. Delivery Policy</h2>
              <p>
                We provide delivery services to specific areas in Dubai, including International City, Dubai Silicon Oasis, Warsan, and Academic City. Delivery times are estimates and may vary based on traffic and demand.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">4. Table Reservations</h2>
              <p>
                Reservations made through the website are subject to availability. A confirmation via WhatsApp will be provided to finalize your booking. We kindly request that you inform us of any cancellations at least 2 hours in advance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">5. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and images, is the property of Daba Choice or its content suppliers and is protected by international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">6. Limitation of Liability</h2>
              <p>
                Daba Choice shall not be liable for any direct, indirect, incidental, special or consequential damages resulting from the use or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">7. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United Arab Emirates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">8. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4 text-primary font-bold">
                +971 50 424 7836<br />
                +971 4 577 0225
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
