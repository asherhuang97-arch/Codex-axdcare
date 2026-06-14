const socialLinks = [
  {
    platform: "Facebook",
    url: "https://www.facebook.com/axdcare",
    icon: "facebook"
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/axdcare",
    icon: "instagram"
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/company/shenzhen-axd-electronic-co-ltd",
    icon: "linkedin"
  }
];

const icons = {
  facebook: (
    <path d="M18.4 9.5h2.1V5.9c-.4-.1-1.7-.2-3.2-.2-3.2 0-5.4 2-5.4 5.6v3.1H8.5v4h3.4v10h4.2v-10h3.3l.5-4h-3.8v-2.7c0-1.2.3-2.2 2.3-2.2Z" />
  ),
  instagram: (
    <>
      <path d="M16 9.1a6.9 6.9 0 1 0 0 13.8 6.9 6.9 0 0 0 0-13.8Zm0 11.4a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm8.8-11.7a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0Z" />
      <path d="M23.3 4.8H8.7a3.9 3.9 0 0 0-3.9 3.9v14.6a3.9 3.9 0 0 0 3.9 3.9h14.6a3.9 3.9 0 0 0 3.9-3.9V8.7a3.9 3.9 0 0 0-3.9-3.9Zm1.5 18.5c0 .8-.7 1.5-1.5 1.5H8.7c-.8 0-1.5-.7-1.5-1.5V8.7c0-.8.7-1.5 1.5-1.5h14.6c.8 0 1.5.7 1.5 1.5v14.6Z" />
    </>
  ),
  linkedin: (
    <path d="M8.2 12.2h4.2v13.5H8.2V12.2Zm2.1-6.7a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Zm5 6.7h4v1.8h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6v7.3h-4.2v-6.5c0-1.6 0-3.6-2.2-3.6s-2.6 1.7-2.6 3.4v6.7h-4.2V12.2Z" />
  )
};

export function SocialLinks({ links = socialLinks }) {
  return (
    <div className="footer-social" aria-label="AXDCARE social media links">
      {links.map((item) => (
        <a
          className="social-link"
          href={item.url}
          key={item.platform}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`AXDCARE on ${item.platform}`}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            {icons[item.icon]}
          </svg>
          <span>{item.platform}</span>
        </a>
      ))}
    </div>
  );
}
