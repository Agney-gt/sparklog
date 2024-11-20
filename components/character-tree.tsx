'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Lightbulb, 
  Scale, 
  Star, 
  Sun, 
  TreeDeciduous, 
  Users, 
  Shield, 
  Feather, 
  MessageSquare, 
  Handshake, 
  Sword, 
  AlertTriangle, 
  Users2, 
  Brain, 
  FlaskConical, 
  Banknote, 
  BadgeAlert, 
  Bomb, 
  Gavel, 
  Book, 
  Target, 
  Workflow,  
  Footprints, 
  Tractor, 
  ScrollText, 
  Home, 
  GraduationCap, 
  PartyPopper, 
  Compass, 
  Building2, 
  UserRound, 
  HeartHandshake, 
  Baby, 
  CheckCircle2, 
  Ear, 
  ThermometerSun, 
  Clock, 
  Smile, 
  Mountain, 
  Cross, 
  Sprout, 
  HeartPulse, 
  Laugh, 
  Flower2, 
  Sparkles, 
  MessageCircle, 
  MessagesSquare, 
  Speech, 
  SpeakerIcon, 
  Megaphone, 
  VolumeX, 
  Volume2, 
  MessageSquareWarning, 
  MessageSquareDashed, 
  MessageSquareHeart,
  BookOpen, 
  Hammer, 
  Search, 
  Crown, 
  Share, 
  Heart, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Quest {
  title: string
  verse: string
  question: string
  description: string
  benefits: string
  category: string
  icon: React.ReactNode
}

export function CharacterTree() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
  const [selectedPath, setSelectedPath] = useState<'character' | 'conflict' | 'consequences' | 'discipline' | 'family' | 'honesty' | 'patience' | 'simplicity' | 'speech' | 'wisdom'>('character')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      scrollContainerRef.current.scrollLeft += scrollAmount
    }
  }

  const characterQuests: Quest[] = [
    {
      title: "A Noble Crown",
      verse: "A wife of noble character is her husband's crown, but a disgraceful wife is like decay in his bones. (Proverbs 12:4)",
      question: "How did I show noble character today, and what impact did it have on my relationships?",
      description: "Focus on embodying noble traits like loyalty, kindness, and patience. Over 15 days, reflect on how your actions positively influenced your relationships, whether with family, friends, or coworkers.",
      benefits: "Strengthen bonds and uplift others.",
      category: "Character & Virtue",
      icon: <Crown className="w-8 h-8 text-white" />
    },
    {
      title: "Shining Brightly",
      verse: "The light of the righteous shines brightly, but the lamp of the wicked is snuffed out. (Proverbs 13:9)",
      question: "How did I let my inner light shine today?",
      description: "Focus for 15 days on actions that reflect kindness, positivity, or guidance for others. Reflect on how these actions brightened someone's day.",
      benefits: "Create joy and inspiration.",
      category: "Character & Virtue",
      icon: <Sun className="w-8 h-8 text-white" />
    },
    {
      title: "Fulfilled Longings",
      verse: "Hope deferred makes the heart sick, but a longing fulfilled is a tree of life. (Proverbs 13:12)",
      question: "What small step did I take today to fulfill my hopes?",
      description: "Reflect for 15 days on working towards meaningful goals. Write about the joy of making progress and achieving milestones.",
      benefits: "Experience motivation and satisfaction.",
      category: "Character & Virtue",
      icon: <TreeDeciduous className="w-8 h-8 text-white" />
    },
    {
      title: "Love over Wealth",
      verse: "Better a small serving of vegetables with love than a fattened calf with hatred. (Proverbs 15:17)",
      question: "Am I prioritizing love and connection in my relationships?",
      description: "Reflect on your relationships and how love is expressed. How can you choose love over material wealth?",
      benefits: "Choosing love over wealth leads to deeper relationships.",
      category: "Character & Virtue",
      icon: <Heart className="w-8 h-8 text-white" />
    },
    {
      title: "Pride and Humility",
      verse: "Pride goes before destruction, a haughty spirit before a fall. (Proverbs 16:18)",
      question: "How am I avoiding pride and cultivating humility?",
      description: "Reflect on moments where pride may have led to conflict or setbacks. Journal how humility shaped positive outcomes.",
      benefits: "Recognizing the danger of pride helps avoid failure and conflict.",
      category: "Character & Virtue",
      icon: <Scale className="w-8 h-8 text-white" />
    },
    {
      title: "Humility and Justice",
      verse: "Better to be lowly in spirit along with the oppressed than to share plunder with the proud. (Proverbs 16:19)",
      question: "Am I embracing humility in my relationships with others?",
      description: "Reflect on your interactions with others, especially those in need. How can you practice humility rather than joining in prideful behaviors?",
      benefits: "Practicing humility and justice leads to peace and respect from others.",
      category: "Character & Virtue",
      icon: <Shield className="w-8 h-8 text-white" />
    },
    {
      title: "Graciousness and Wisdom",
      verse: "The wise in heart are called discerning, and gracious words promote instruction. (Proverbs 16:21)",
      question: "Am I using my words to encourage and promote learning?",
      description: "Reflect on your conversations and how your words either built up or tore down others. Journal how gracious words led to positive interactions.",
      benefits: "Using gracious words fosters understanding and growth.",
      category: "Character & Virtue",
      icon: <Feather className="w-8 h-8 text-white" />
    },
    {
      title: "Respect for the Poor",
      verse: "Whoever mocks the poor shows contempt for their Maker; whoever gloats over disaster will not go unpunished. (Proverbs 17:5)",
      question: "Am I showing respect to the poor and vulnerable?",
      description: "Reflect on how you treat others, especially those who are struggling. How can you show kindness and respect?",
      benefits: "Treating others with respect fosters compassion and integrity.",
      category: "Character & Virtue",
      icon: <Users className="w-8 h-8 text-white" />
    },
    {
      title: "Generations and Pride",
      verse: "Children's children are a crown to the aged, and parents are the pride of their children. (Proverbs 17:6)",
      question: "Am I honoring my elders and cherishing my role as a parent or grandparent?",
      description: "Reflect on your relationships with older generations and your children. How can you strengthen these connections?",
      benefits: "Journaling about family connections helps foster gratitude and pride.",
      category: "Character & Virtue",
      icon: <Crown className="w-8 h-8 text-white" />
    },
    {
      title: "Love and Forgiveness",
      verse: "Whoever would foster love covers over an offense, but whoever repeats the matter separates close friends. (Proverbs 17:9)",
      question: "Am I fostering love and forgiveness in my relationships?",
      description: "Reflect on conflicts or offenses that might have hurt your relationships. How can you forgive and move forward?",
      benefits: "Fostering love and forgiveness strengthens relationships.",
      category: "Character & Virtue",
      icon: <Heart className="w-8 h-8 text-white" />
    }
  ]

  const conflictQuests: Quest[] = [
    {
      title: "Conflict and Gossip",
      verse: "A perverse person stirs up conflict, and a gossip separates close friends. (Proverbs 16:28)",
      question: "Am I avoiding gossip or actions that cause division?",
      description: "Reflect on how you handle conflicts and whether gossip has played a role. How can you promote peace and unity?",
      benefits: "Promoting unity avoids the harm of division.",
      category: "Conflict & Resolution",
      icon: <MessageSquare className="w-8 h-8 text-white" />
    },
    {
      title: "Conflict and Resolution",
      verse: "Starting a quarrel is like breaching a dam; so drop the matter before a dispute breaks out. (Proverbs 17:14)",
      question: "Am I avoiding unnecessary conflicts and resolving disagreements peacefully?",
      description: "Reflect on any potential conflicts in your life. How can you resolve them calmly before they escalate?",
      benefits: "Resolving conflicts early prevents lasting damage.",
      category: "Conflict & Resolution",
      icon: <Handshake className="w-8 h-8 text-white" />
    },
    {
      title: "Quarrels and Destruction",
      verse: "Whoever loves a quarrel loves sin; whoever builds a high gate invites destruction. (Proverbs 17:19)",
      question: "Am I avoiding unnecessary quarrels and fostering peace?",
      description: "Reflect on your role in any conflicts. How can you choose peace instead of engaging in quarrels?",
      benefits: "Choosing peace prevents destruction.",
      category: "Conflict & Resolution",
      icon: <Sword className="w-8 h-8 text-white" />
    }
  ]

  const consequenceQuests: Quest[] = [
    {
      title: "Evil Plans and Consequences",
      verse: "A scoundrel plots evil, and on their lips it is like a scorching fire. (Proverbs 16:27)",
      question: "Am I avoiding evil plots or schemes in my life?",
      description: "Reflect on any actions or intentions that might harm others. How can you guard against temptation and evil?",
      benefits: "Guarding against evil thoughts and actions brings peace. For example, choosing honesty over deceit strengthens your integrity.",
      category: "Consequences & Justice",
      icon: <AlertTriangle className="w-8 h-8 text-white" />
    },
    {
      title: "Violence and Influence",
      verse: "A violent person entices their neighbor and leads them down a path that is not good. (Proverbs 16:29)",
      question: "Am I encouraging others to make positive choices, or leading them astray?",
      description: "Reflect on how you influence others around you. How can you guide others toward good paths?",
      benefits: "Positive influence strengthens relationships and promotes good outcomes. For example, encouraging a friend to take part in a positive activity instead of something destructive fosters a better bond.",
      category: "Consequences & Justice",
      icon: <Users2 className="w-8 h-8 text-white" />
    },
    {
      title: "Plotting Evil",
      verse: "Whoever winks with their eye is plotting perversity; whoever purses their lips is bent on evil. (Proverbs 16:30)",
      question: "Am I guarding my actions and intentions from evil plotting?",
      description: "Reflect on any moments where hidden motives or subtle actions influenced your behavior. How can you purify your intentions?",
      benefits: "Guarding against evil plotting leads to a life of integrity. For instance, avoiding underhanded tactics in your work shows commitment to ethical standards.",
      category: "Consequences & Justice",
      icon: <Brain className="w-8 h-8 text-white" />
    },
    {
      title: "Heart Testing",
      verse: "The crucible for silver and the furnace for gold, but the Lord tests the heart. (Proverbs 17:3)",
      question: "How am I being tested in my heart today?",
      description: "Reflect on challenges that may be revealing your inner character. What can you learn from them?",
      benefits: "Journaling on personal challenges helps build resilience. For example, enduring difficult situations with integrity can strengthen your character.",
      category: "Consequences & Justice",
      icon: <FlaskConical className="w-8 h-8 text-white" />
    },
    {
      title: "Bribes and Success",
      verse: "A bribe is seen as a charm by the one who gives it; they think success will come at every turn. (Proverbs 17:8)",
      question: "Am I avoiding bribes or shortcuts in my pursuit of success?",
      description: "Reflect on any temptations to take shortcuts or compromise your integrity for gain. How can you seek success through honest means?",
      benefits: "Choosing integrity over shortcuts promotes long-term success. For example, avoiding corrupt business practices leads to sustainable growth.",
      category: "Consequences & Justice",
      icon: <Banknote className="w-8 h-8 text-white" />
    },
    {
      title: "Rebellion and Consequences",
      verse: "Evildoers foster rebellion against God; the messenger of death will be sent against them. (Proverbs 17:11)",
      question: "Am I resisting rebellion in my heart and actions?",
      description: "Reflect on any areas where you may be resisting God's guidance. How can you align more closely with His will?",
      benefits: "Resisting rebellion brings peace and protection. For example, choosing to follow ethical principles over selfish desires promotes a righteous life.",
      category: "Consequences & Justice",
      icon: <BadgeAlert className="w-8 h-8 text-white" />
    },
    {
      title: "Folly and Consequences",
      verse: "Better to meet a bear robbed of her cubs than a fool bent on folly. (Proverbs 17:12)",
      question: "Am I avoiding foolishness in my actions and decisions?",
      description: "Reflect on any foolish choices you've made recently. How can you correct course and avoid similar mistakes?",
      benefits: "Recognizing foolishness and changing course helps prevent harm. For example, taking time to reconsider hasty decisions can save you from regret.",
      category: "Consequences & Justice",
      icon: <Bomb className="w-8 h-8 text-white" />
    },
    {
      title: "Evil and Retribution",
      verse: "Evil will never leave the house of one who pays back evil for good. (Proverbs 17:13)",
      question: "Am I responding to evil with good, or allowing it to affect my actions?",
      description: "Reflect on how you've responded to evil or injustice. How can you choose kindness and goodness instead?",
      benefits: "Responding with good fosters peace and protection. For instance, choosing forgiveness over revenge strengthens your moral character.",
      category: "Consequences & Justice",
      icon: <Gavel className="w-8 h-8 text-white" />
    }
  ]

  const disciplineQuests: Quest[] = [
    {
      title: "Loving Discipline",
      verse: "Whoever loves discipline loves knowledge, but whoever hates correction is stupid. (Proverbs 12:1)",
      question: "What correction or feedback did I embrace today, and how did it help me grow?",
      description: "Reflect for 15 days on moments where you welcomed feedback or correction. Write about how embracing discipline improved your knowledge, skill, or character.",
      benefits: "Develop a growth mindset and humility. Example Day 3: Journal about learning from a critique at work. Day 10 Example: Write about how someone's feedback improved a project or decision.",
      category: "Discipline & Growth",
      icon: <Book className="w-8 h-8 text-white" />
    },
    {
      title: "Harvesting Hard Work",
      verse: "Those who work their land will have abundant food, but those who chase fantasies have no sense. (Proverbs 12:11)",
      question: "What practical effort did I put in today to work toward my goals?",
      description: "Reflect on steady, productive effort over 15 days. Write about tasks you completed each day instead of chasing distractions or unrealistic shortcuts.",
      benefits: "Build discipline and see tangible progress. Example Day 3: Write about finishing an important task at work. Day 8 Example: Reflect on learning a new skill instead of wasting time on distractions.",
      category: "Discipline & Growth",
      icon: <Target className="w-8 h-8 text-white" />
    },
    {
      title: "Pursuing Diligence",
      verse: "A sluggard's appetite is never filled, but the desires of the diligent are fully satisfied. (Proverbs 13:4)",
      question: "What diligent effort did I make today toward my goals?",
      description: "Reflect for 15 days on your efforts to achieve personal or professional goals. Track how perseverance leads to fulfillment.",
      benefits: "Build discipline and satisfaction. Example Day 6: Completing a challenging task. Day 10 Example: Learning a new skill to improve productivity.",
      category: "Discipline & Growth",
      icon: <Workflow className="w-8 h-8 text-white" />
    },
    {
      title: "Prudent Actions",
      verse: "All who are prudent act with knowledge, but fools expose their folly. (Proverbs 13:16)",
      question: "What thoughtful action did I take today to show prudence?",
      description: "Focus for 15 days on acting with deliberation and forethought. Reflect on how being prudent avoided unnecessary risks or mistakes.",
      benefits: "Build a reputation for reliability. Example Day 3: Researching before making a decision. Day 9 Example: Handling a conflict with tact.",
      category: "Discipline & Growth",
      icon: <Brain className="w-8 h-8 text-white" />
    },
    {
      title: "Walking Uprightly",
      verse: "Whoever fears the Lord walks uprightly, but those who despise him are devious in their ways. (Proverbs 14:2)",
      question: "Am I making choices that align with integrity today?",
      description: "Examine daily decisions to see whether they reflect your principles. Journal how fearing the Lord or living with reverence influences your behavior.",
      benefits: "Integrity attracts trust. For instance, being honest at work despite pressure can lead to recognition and promotion.",
      category: "Discipline & Growth",
      icon: <Footprints className="w-8 h-8 text-white" />
    },
    {
      title: "Productivity through Action",
      verse: "Where there are no oxen, the manger is empty, but from the strength of an ox come abundant harvests. (Proverbs 14:4)",
      question: "Am I putting in the effort necessary to produce meaningful results?",
      description: "Reflect on your daily efforts in both work and personal life. How are you ensuring that you are working toward a greater outcome, even when the process may seem difficult?",
      benefits: "Consistent effort leads to great rewards. For instance, long-term dedication to a fitness plan brings about noticeable health improvements over time.",
      category: "Discipline & Growth",
      icon: <Tractor className="w-8 h-8 text-white" />
    },
    {
      title: "Prudent Decision-Making",
      verse: "The wisdom of the prudent is to give thought to their ways, but the folly of fools is deception. (Proverbs 14:8)",
      question: "Am I thinking through my decisions before acting?",
      description: "Consider your recent decisions and evaluate whether you took the time to think things through carefully. Document improvements in your decision-making process.",
      benefits: "Thoughtful decisions lead to better outcomes. For instance, planning a vacation well in advance leads to a more enjoyable and less stressful trip.",
      category: "Discipline & Growth",
      icon: <ScrollText className="w-8 h-8 text-white" />
    },
    {
      title: "Making Amends",
      verse: "Fools mock at making amends for sin, but goodwill is found among the upright. (Proverbs 14:9)",
      question: "Have I taken responsibility for my mistakes and sought to make amends?",
      description: "Reflect on any recent wrongdoings or mistakes. How did you address them, and what steps did you take to make things right?",
      benefits: "Taking responsibility fosters trust and repair. For example, apologizing to a coworker for a mistake shows maturity and fosters better working relationships.",
      category: "Discipline & Growth",
      icon: <Hammer className="w-8 h-8 text-white" />
    },
    {
      title: "Flourishing through Righteousness",
      verse: "The house of the wicked will be destroyed, but the tent of the upright will flourish. (Proverbs 14:11)",
      question: "Am I living in a way that leads to lasting success?",
      description: "Reflect on the long-term results of your actions. Do they align with righteousness and contribute to flourishing?",
      benefits: "Flourishing comes from a foundation of righteousness. For instance, consistently working hard with integrity can lead to a fulfilling career and personal life.",
      category: "Discipline & Growth",
      icon: <Home className="w-8 h-8 text-white" />
    },
    {
      title: "Discipline for Growth",
      verse: "Stern discipline awaits anyone who leaves the path; the one who hates correction will die. (Proverbs 15:10)",
      question: "Am I accepting the discipline I need to stay on the right path?",
      description: "Reflect on moments where correction or discipline helped you grow. How can you embrace discipline in a positive light?",
      benefits: "Discipline leads to growth and avoids negative consequences. For example, setting personal goals and sticking to them helps build a foundation for success.",
      category: "Discipline & Growth",
      icon: <GraduationCap className="w-8 h-8 text-white" />
    }
  ]

  const familyQuests: Quest[] = [
    {
      title: "Joy in Parents",
      verse: "A wise son brings joy to his father, but a foolish man despises his mother. (Proverbs 15:20)",
      question: "Am I honoring my parents with my actions today?",
      description: "Reflect on how your behavior honors or disrespects your parents. How can you bring them joy through your actions?",
      benefits: "Honoring your parents leads to deeper family bonds. For example, showing appreciation for your parents' efforts strengthens your relationship with them.",
      category: "Family & Relationships",
      icon: <PartyPopper className="w-8 h-8 text-white" />
    },
    {
      title: "Joy in Understanding",
      verse: "Folly brings joy to one who has no sense, but whoever has understanding keeps a straight course. (Proverbs 15:21)",
      question: "Am I staying focused on what's truly important today?",
      description: "Reflect on moments where distractions led you astray. How can you focus on what truly matters?",
      benefits: "Focusing on what's important leads to personal fulfillment. For instance, prioritizing family time over entertainment creates stronger bonds.",
      category: "Family & Relationships",
      icon: <Compass className="w-8 h-8 text-white" />
    },
    {
      title: "Family and Inheritance",
      verse: "A prudent servant will rule over a disgraceful son and will share the inheritance as one of the family. (Proverbs 17:2)",
      question: "Am I being a prudent servant in my relationships and responsibilities?",
      description: "Reflect on your role within your family or community. How can you be a responsible steward of relationships and resources?",
      benefits: "Being a prudent servant leads to respect and trust. For example, taking responsibility for family matters can foster unity and respect.",
      category: "Family & Relationships",
      icon: <Building2 className="w-8 h-8 text-white" />
    },
    {
      title: "True Friendship",
      verse: "A friend loves at all times, and a brother is born for a time of adversity. (Proverbs 17:17)",
      question: "Am I being a true friend and offering support during difficult times?",
      description: "Reflect on your role as a friend. How can you provide support and loyalty to others during tough moments?",
      benefits: "True friendships are tested in adversity. For example, offering support during a friend's crisis strengthens the relationship.",
      category: "Family & Relationships",
      icon: <HeartHandshake className="w-8 h-8 text-white" />
    },
    {
      title: "Heart and Prosperity",
      verse: "One whose heart is corrupt does not prosper; one whose tongue is perverse falls into trouble. (Proverbs 17:20)",
      question: "Am I guarding my heart and speech from corruption?",
      description: "Reflect on areas where your heart or speech might be leading you astray. How can you purify them?",
      benefits: "Guarding your heart and speech leads to prosperity. For instance, practicing positive self-talk and honest speech brings peace and success.",
      category: "Family & Relationships",
      icon: <UserRound className="w-8 h-8 text-white" />
    },
    {
      title: "Foolish Children",
      verse: "A foolish son brings grief to his father and bitterness to the mother who bore him. (Proverbs 17:25)",
      question: "Am I nurturing wisdom in my children or those I influence?",
      description: "Reflect on how you influence younger generations. How can you guide them toward wisdom?",
      benefits: "Influencing children towards wisdom brings joy and pride. For example, guiding a child to make wise choices brings joy to both parent and child.",
      category: "Family & Relationships",
      icon: <Baby className="w-8 h-8 text-white" />
    }
  ]

  const honestyQuests: Quest[] = [
    {
      title: "Receiving Correction",
      verse: "A fool spurns a parent's discipline, but whoever heeds correction shows prudence. (Proverbs 15:5)",
      question: "Am I receptive to correction or quick to reject it?",
      description: "Examine your response to criticism and correction. Document how accepting guidance has shaped your personal growth.",
      benefits: "Receiving correction leads to growth and wisdom. For instance, accepting constructive feedback at work can improve your performance and professional development.",
      category: "Honesty & Trust",
      icon: <CheckCircle2 className="w-8 h-8 text-white" />
    },
    {
      title: "Instruction and Trust",
      verse: "Whoever gives heed to instruction prospers, and blessed is the one who trusts in the Lord. (Proverbs 16:20)",
      question: "Am I listening to wise instruction and trusting in God's guidance?",
      description: "Reflect on moments where instruction or guidance led you to a better place. Journal how trusting God has shaped your decisions.",
      benefits: "Heeding instruction and trusting in God leads to success and fulfillment. For example, following a mentor's advice can lead to better career outcomes.",
      category: "Honesty & Trust",
      icon: <Ear className="w-8 h-8 text-white" />
    }
  ]

  const patienceQuests: Quest[] = [
    {
      title: "Grief Behind Joy",
      verse: "Even in laughter the heart may ache, and rejoicing may end in grief. (Proverbs 14:13)",
      question: "Am I aware of the deeper emotions behind my actions?",
      description: "Reflect on moments when joy or laughter masked deeper emotions. Document insights that reveal your true feelings.",
      benefits: "Awareness of underlying emotions leads to self-awareness. For instance, realizing that work stress may manifest as humor allows you to address the root issue.",
      category: "Patience & Resilience",
      icon: <ThermometerSun className="w-8 h-8 text-white" />
    },
    {
      title: "Patience over Impulsiveness",
      verse: "A quick-tempered person does foolish things, and the one who devises evil schemes is hated. (Proverbs 14:17)",
      question: "Am I reacting with patience or quick temper?",
      description: "Examine moments where your temper flared. How did it impact your actions, and how could patience have changed the outcome?",
      benefits: "Patience leads to better decision-making. For instance, taking a deep breath before responding in a conflict results in a more reasoned and constructive solution.",
      category: "Patience & Resilience",
      icon: <Clock className="w-8 h-8 text-white" />
    },
    {
      title: "Patience over Conflict",
      verse: "A hot-tempered person stirs up conflict, but the one who is patient calms a quarrel. (Proverbs 15:18)",
      question: "Am I responding with patience in conflicts today?",
      description: "Reflect on conflicts you've experienced today. How did you respond, and how could patience have changed the outcome?",
      benefits: "Patience calms conflict and fosters peace. For example, staying calm in a heated discussion at work can lead to a more productive and respectful resolution.",
      category: "Patience & Resilience",
      icon: <Smile className="w-8 h-8 text-white" />
    },
    {
      title: "Patience and Strength",
      verse: "Better a patient person than a warrior, one with self-control than one who takes a city. (Proverbs 16:32)",
      question: "Am I practicing patience and self-control in challenging situations?",
      description: "Reflect on moments where you had to practice patience or self-control. How did it lead to better results?",
      benefits: "Patience and self-control build inner strength and better outcomes. For instance, waiting for the right opportunity in negotiations leads to better deals than rushing in.",
      category: "Patience & Resilience",
      icon: <Mountain className="w-8 h-8 text-white" />
    },
    {
      title: "Divine Sovereignty",
      verse: "The lot is cast into the lap, but its every decision is from the Lord. (Proverbs 16:33)",
      question: "Am I trusting in God's sovereignty in my life and decisions?",
      description: "Reflect on how you trust God in the unknown. How does recognizing His control bring peace to your decisions?",
      benefits: "Trusting in God's sovereignty reduces anxiety and builds faith. For example, trusting God's plan in uncertain times can bring peace of mind and clarity.",
      category: "Patience & Resilience",
      icon: <Cross className="w-8 h-8 text-white" />
    },
    {
      title: "Peace and Quiet",
      verse: "Better a dry crust with peace and quiet than a house full of feasting, with strife. (Proverbs 17:1)",
      question: "How can I cultivate peace and quiet in my life today?",
      description: "Reflect on your environment and relationships. How can you choose peace over conflict?",
      benefits: "Journaling on moments when you prioritized peace over luxury can lead to greater inner calm. For example, choosing a quiet evening at home instead of a noisy gathering can restore balance.",
      category: "Patience & Resilience",
      icon: <Star className="w-8 h-8 text-white" />
    },
    {
      title: "Parental Grief",
      verse: "To have a fool for a child brings grief; there is no joy for the parent of a godless fool. (Proverbs 17:21)",
      question: "Am I nurturing wisdom and goodness in my children or those I mentor?",
      description: "Reflect on your role as a mentor or parent. How can you foster wisdom and righteousness in those you care for?",
      benefits: "Nurturing wisdom in others leads to long-term fulfillment. For example, guiding a child to make wise choices brings joy to both parent and child.",
      category: "Patience & Resilience",
      icon: <Sprout className="w-8 h-8 text-white" />
    }
  ]

  const simplicityQuests: Quest[] = [
    {
      title: "Personal Joy",
      verse: "Each heart knows its own bitterness, and no one else can share its joy. (Proverbs 14:10)",
      question: "Am I in touch with my own emotions and processing them?",
      description: "Consider how you are managing your emotions. Reflect on how you deal with personal struggles and celebrate your own victories.",
      benefits: "Being in touch with your emotions leads to emotional intelligence. For example, journaling about difficult situations can help process them and improve mental clarity.",
      category: "Simplicity & Joy",
      icon: <HeartPulse className="w-8 h-8 text-white" />
    },
    {
      title: "Cheerfulness vs. Heartache",
      verse: "A happy heart makes the face cheerful, but heartache crushes the spirit. (Proverbs 15:13)",
      question: "Am I maintaining a cheerful heart, even in difficult situations?",
      description: "Reflect on your emotional state throughout the day. How do you handle heartache, and how can you cultivate joy?",
      benefits: "Cultivating joy leads to better mental and physical health. For instance, focusing on gratitude during tough times can lift your spirit and help you persevere.",
      category: "Simplicity & Joy",
      icon: <Laugh className="w-8 h-8 text-white" />
    },
    {
      title: "Joy in Simplicity",
      verse: "All the days of the oppressed are wretched, but the cheerful heart has a continual feast. (Proverbs 15:15)",
      question: "Am I finding joy in the simple things in life?",
      description: "Reflect on how you find contentment in simple pleasures. What can you do today to cultivate a cheerful heart?",
      benefits: "Cultivating joy leads to inner peace. For instance, spending quality time with family and appreciating small moments can create lasting happiness.",
      category: "Simplicity & Joy",
      icon: <Flower2 className="w-8 h-8 text-white" />
    },
    {
      title: "Cheerfulness and Health",
      verse: "A cheerful heart is good medicine, but a crushed spirit dries up the bones. (Proverbs 17:22)",
      question: "Am I cultivating a cheerful and positive attitude?",
      description: "Reflect on how your attitude affects your mood and health. How can you bring more cheer into your day?",
      benefits: "A cheerful heart improves mental and physical health. For example, focusing on gratitude and joy can reduce stress and improve overall well-being.",
      category: "Simplicity & Joy",
      icon: <Sparkles className="w-8 h-8 text-white" />
    }
  ]

  const speechQuests: Quest[] = [
    {
      title: "Words That Heal",
      verse: "The words of the reckless pierce like swords, but the tongue of the wise brings healing. (Proverbs 12:18)",
      question: "What words did I speak today that brought healing or encouragement to someone?",
      description: "Focus on positive and healing communication. Over 15 days, reflect on moments where your words encouraged or comforted someone, or de-escalated a conflict.",
      benefits: "Strengthen connections and create a positive environment. Example Day 4: Write about complimenting a colleague. Day 10 Example: Reflect on calming a heated argument with empathetic words.",
      category: "Speech & Communication",
      icon: <MessageSquareHeart className="w-8 h-8 text-white" />
    },
    {
      title: "Speaking Fruitfully",
      verse: "From the fruit of their lips people enjoy good things, but the unfaithful have an appetite for violence. (Proverbs 13:2)",
      question: "How did my words today bring good things or harm to others?",
      description: "Track your words for 15 days. Reflect on instances where your speech created positivity, cooperation, or healing.",
      benefits: "Achieve harmony and respect. Example Day 2: Complimenting a coworker's effort. Day 11 Example: Mediating a conflict with kind words.",
      category: "Speech & Communication",
      icon: <MessageCircle className="w-8 h-8 text-white" />
    },
    {
      title: "Guarding Your Speech",
      verse: "Those who guard their lips preserve their lives, but those who speak rashly will come to ruin. (Proverbs 13:3)",
      question: "Did I think before speaking today, and how did it affect my outcomes?",
      description: "Focus on thoughtful speech for 15 days. Reflect on situations where caution or restraint in words avoided conflict or harm.",
      benefits: "Develop self-control and diplomacy. Example Day 4: Avoiding a harsh reply during an argument. Day 8 Example: Speaking calmly in a tense meeting.",
      category: "Speech & Communication",
      icon: <VolumeX className="w-8 h-8 text-white" />
    },
    {
      title: "Guarding Your Speech II",
      verse: "A fool's mouth lashes out with pride, but the lips of the wise protect them. (Proverbs 14:3)",
      question: "Did my words today bring protection or cause harm?",
      description: "Reflect on the impact of your words each day. Document situations where you spoke wisely or avoided lashing out in pride. Identify ways to improve communication for positive outcomes.",
      benefits: "Speaking wisely prevents conflict and builds respect. For example, choosing calm words during a heated meeting can de-escalate tensions and foster better teamwork.",
      category: "Speech & Communication",
      icon: <MessageSquareWarning className="w-8 h-8 text-white" />
    },
    {
      title: "Gentle Words",
      verse: "A gentle answer turns away wrath, but a harsh word stirs up anger. (Proverbs 15:1)",
      question: "How can I respond with gentleness today, even when provoked?",
      description: "Reflect on moments of conflict and practice offering gentle responses. Document situations where a calm tone diffused tension.",
      benefits: "Using gentleness in conflict can lead to peaceful resolutions. For example, responding calmly to a colleague's criticism can avoid escalation and foster collaboration.",
      category: "Speech & Communication",
      icon: <Volume2 className="w-8 h-8 text-white" />
    },
    {
      title: "Wisdom in Speech",
      verse: "The tongue of the wise adorns knowledge, but the mouth of the fool gushes folly. (Proverbs 15:2)",
      question: "Am I speaking wisely today?",
      description: "Pay attention to your words and how they reflect knowledge or folly. Journal any moments when your speech contributed to wisdom or confusion.",
      benefits: "Wisdom in speech fosters learning and respect. For instance, sharing an insightful thought in a meeting can inspire others and showcase your understanding.",
      category: "Speech & Communication",
      icon: <Speech className="w-8 h-8 text-white" />
    },
    {
      title: "Healing Words",
      verse: "The soothing tongue is a tree of life, but a perverse tongue crushes the spirit. (Proverbs 15:4)",
      question: "How can I use my words to uplift others today?",
      description: "Reflect on how your words can either encourage or discourage. Journal about instances where your speech either uplifted someone or hurt their spirit.",
      benefits: "Words can heal and bring life. For example, offering a kind compliment to a friend can boost their confidence and strengthen your relationship.",
      category: "Speech & Communication",
      icon: <MessagesSquare className="w-8 h-8 text-white" />
    },
    {
      title: "Gracious Words",
      verse: "Gracious words are a honeycomb, sweet to the soul and healing to the bones. (Proverbs 16:24)",
      question: "Am I using my words to heal and uplift others?",
      description: "Reflect on how your words have either helped or harmed others today. Journal moments where you used kind words.",
      benefits: "Gracious words build trust and healing. For example, offering comforting words to a friend in need can uplift their spirit.",
      category: "Speech & Communication",
      icon: <MessageSquareDashed className="w-8 h-8 text-white" />
    },
    {
      title: "Deceit and Lying",
      verse: "A wicked person listens to deceitful lips; a liar pays attention to a destructive tongue. (Proverbs 17:4)",
      question: "Am I avoiding deceit and lies in my life?",
      description: "Reflect on situations where deceit or dishonesty might have influenced your decisions. How can you stay true to your values?",
      benefits: "Rejecting deceit protects your integrity. For instance, choosing honesty in tough situations can prevent long-term damage to relationships.",
      category: "Speech & Communication",
      icon: <SpeakerIcon className="w-8 h-8 text-white" />
    },
    {
      title: "Speech and Foolishness",
      verse: "Eloquent lips are unsuited to a godless fool—how much worse lying lips to a ruler! (Proverbs 17:7)",
      question: "Am I speaking wisely, or allowing foolishness to influence my words?",
      description: "Reflect on how your words impact others. Are you speaking with wisdom or carelessness?",
      benefits: "Being mindful of your words builds respect and trust. For instance, speaking truthfully in leadership situations ensures clarity and credibility.",
      category: "Speech & Communication",
      icon: <Megaphone className="w-8 h-8 text-white" />
    },
    {
      title: "Words and Wisdom",
      verse: "The one who has knowledge uses words with restraint, and whoever has understanding is even-tempered. (Proverbs 17:27)",
      question: "Am I using my words wisely and with restraint?",
      description: "Reflect on your speech and its impact on others. How can you speak more thoughtfully?",
      benefits: "Journaling on moments when you've spoken wisely can help you become more measured in your communication. For instance, pausing before reacting can prevent misunderstandings.",
      category: "Speech & Communication",
      icon: <MessageSquare className="w-8 h-8 text-white" />
    }
  ]
  const wisdomQuests: Quest[] = [
    {
        title: "Choosing Wisdom",
        verse: "Where there is strife, there is pride, but wisdom is found in those who take advice. (Proverbs 13:10)",
        question: "Did I humbly accept advice today? What did I learn?",
        description: "Focus on embracing advice and wisdom from others for 15 days. Reflect on moments of learning and growth.",
        benefits: "Gain clarity and reduce conflict. Example Day 3: Listening to a mentor’s guidance. Day 9 Example: Applying feedback to improve a project.",
        category: "Wisdom & Knowledge",
        icon: <BookOpen className="w-8 h-8 text-white" />
    },
    {
        title: "Fountain of Wisdom",
        verse: "The teaching of the wise is a fountain of life, turning a person from the snares of death. (Proverbs 13:14)",
        question: "What wisdom did I learn today, and how can I apply it?",
        description: "Focus on absorbing wisdom from mentors, books, or experiences for 15 days. Reflect on how it helps avoid pitfalls.",
        benefits: "Gain clarity and life skills. Example Day 1: Journaling insights from a leadership book. Day 7 Example: Applying advice to solve a problem.",
        category: "Wisdom & Knowledge",
        icon: <Lightbulb className="w-8 h-8 text-white" />
    },
    {
        title: "Walking with Wisdom",
        verse: "Walk with the wise and become wise, for a companion of fools suffers harm. (Proverbs 13:20)",
        question: "Who did I surround myself with today, and how did they influence me?",
        description: "Reflect for 15 days on the company you keep. Write about how the wisdom or folly of others shaped your actions or thoughts.",
        benefits: "Build positive influences and wisdom. Example Day 5: Spending time with a mentor. Day 14 Example: Avoiding a harmful group dynamic.",
        category: "Wisdom & Knowledge",
        icon: <Banknote className="w-8 h-8 text-white" />
    },
    {
        title: "Building with Wisdom",
        verse: "The wise woman builds her house, but with her own hands the foolish one tears hers down. (Proverbs 14:1)",
        question: "How am I building or tearing down my relationships?",
        description: "Reflect on your actions daily to identify if you are strengthening or weakening your relationships at work, home, or community. Document steps taken to build trust, encourage growth, or address issues positively.",
        benefits: "Strengthening relationships builds a support network. For example, resolving conflict with a sibling through honest conversation can foster long-term harmony.",
        category: "Wisdom & Knowledge",
        icon: <Clock className="w-8 h-8 text-white" />
    },
    {
        title: "Wisdom in Seeking Knowledge",
        verse: "The mocker seeks wisdom and finds none, but knowledge comes easily to the discerning. (Proverbs 14:6)",
        question: "What steps am I taking to seek wisdom in my daily life?",
        description: "Identify specific actions or decisions where you actively sought knowledge. Reflect on moments of growth and improvement.",
        benefits: "Seeking wisdom leads to greater understanding. For example, reading a self-improvement book or taking a course enhances your ability to solve problems effectively.",
        category: "Wisdom & Knowledge",
        icon: <Search className="w-8 h-8 text-white" />
    },
    {
      title: "Choosing Wisdom",
      verse: "Where there is strife, there is pride, but wisdom is found in those who take advice. (Proverbs 13:10)",
      question: "Did I humbly accept advice today? What did I learn?",
      description: "Focus on embracing advice and wisdom from others for 15 days. Reflect on moments of learning and growth.",
      benefits: "Gain clarity and reduce conflict.",
      category: "Wisdom & Knowledge",
      icon: <BookOpen className="w-8 h-8 text-white" />
    },
    {
      title: "Fountain of Wisdom",
      verse: "The teaching of the wise is a fountain of life, turning a person from the snares of death. (Proverbs 13:14)",
      question: "What wisdom did I learn today, and how can I apply it?",
      description: "Focus on absorbing wisdom from mentors, books, or experiences for 15 days. Reflect on how it helps avoid pitfalls.",
      benefits: "Gain clarity and life skills.",
      category: "Wisdom & Knowledge",
      icon: <Mountain className="w-8 h-8 text-white" />
    },
    {
      title: "Walking with Wisdom",
      verse: "Walk with the wise and become wise, for a companion of fools suffers harm. (Proverbs 13:20)",
      question: "Who did I surround myself with today, and how did they influence me?",
      description: "Reflect for 15 days on the company you keep. Write about how the wisdom or folly of others shaped your actions or thoughts.",
      benefits: "Build positive influences and wisdom.",
      category: "Wisdom & Knowledge",
      icon: <Cross className="w-8 h-8 text-white" />
    },
    {
      title: "Building with Wisdom",
      verse: "The wise woman builds her house, but with her own hands the foolish one tears hers down. (Proverbs 14:1)",
      question: "How am I building or tearing down my relationships?",
      description: "Reflect on your actions daily to identify if you are strengthening or weakening your relationships at work, home, or community. Document steps taken to build trust, encourage growth, or address issues positively.",
      benefits: "Strengthening relationships builds a support network.",
      category: "Wisdom & Knowledge",
      icon: <Hammer className="w-8 h-8 text-white" />
    },
    {
      title: "Wisdom in Seeking Knowledge",
      verse: "The mocker seeks wisdom and finds none, but knowledge comes easily to the discerning. (Proverbs 14:6)",
      question: "What steps am I taking to seek wisdom in my daily life?",
      description: "Identify specific actions or decisions where you actively sought knowledge. Reflect on moments of growth and improvement.",
      benefits: "Seeking wisdom leads to greater understanding.",
      category: "Wisdom & Knowledge",
      icon: <Search className="w-8 h-8 text-white" />
    },
    {
      title: "Avoiding Fools",
      verse: "Stay away from a fool, for you will not find knowledge on their lips. (Proverbs 14:7)",
      question: "Am I surrounding myself with individuals who promote growth?",
      description: "Reflect on the relationships in your life. Are you spending time with people who challenge you and encourage your growth?",
      benefits: "Surrounding yourself with wise people promotes personal growth.",
      category: "Wisdom & Knowledge",
      icon: <Sprout className="w-8 h-8 text-white" />
    },
    {
      title: "Understanding the Right Path",
      verse: "There is a way that appears to be right, but in the end it leads to death. (Proverbs 14:12)",
      question: "Am I following the right path in my decisions?",
      description: "Examine any choices you've made recently and question whether they align with your core values and long-term goals.",
      benefits: "Choosing the right path leads to fulfillment.",
      category: "Wisdom & Knowledge",
      icon: <Laugh className="w-8 h-8 text-white" />
    },
    {
      title: "Fearing the Lord",
      verse: "The wise fear the Lord and shun evil, but a fool is hotheaded and yet feels secure. (Proverbs 14:16)",
      question: "Do I turn away from evil and seek wisdom daily?",
      description: "Reflect on moments where you chose to act with wisdom and integrity instead of reacting impulsively.",
      benefits: "Choosing wisdom and avoiding evil leads to peace and security.",
      category: "Wisdom & Knowledge",
      icon: <Flower2 className="w-8 h-8 text-white" />
    },
    {
      title: "The Prudent Inherit Knowledge",
      verse: "The simple inherit folly, but the prudent are crowned with knowledge. (Proverbs 14:18)",
      question: "Am I striving to gain knowledge and wisdom each day?",
      description: "Reflect on how you actively seek knowledge. What new skills or insights have you gained recently?",
      benefits: "Continuous learning leads to wisdom.",
      category: "Wisdom & Knowledge",
      icon: <Crown className="w-8 h-8 text-white" />
    },
    {
      title: "Spreading Knowledge",
      verse: "The lips of the wise spread knowledge, but the hearts of fools are not upright. (Proverbs 15:7)",
      question: "How am I sharing knowledge with others?",
      description: "Reflect on opportunities to share wisdom or teach others. How has this shaped your relationships and your environment?",
      benefits: "Sharing knowledge helps you and others grow.",
      category: "Wisdom & Knowledge",
      icon: <Share className="w-8 h-8 text-white" />
    },
    {
      title: "Understanding Hearts",
      verse: "Death and Destruction lie open before the Lord—how much more do human hearts! (Proverbs 15:11)",
      question: "How well do I understand my own heart and motivations?",
      description: "Reflect on the condition of your heart. What are your true motivations and desires? How can you align them with wisdom?",
      benefits: "Understanding your heart leads to greater wisdom and discernment.",
      category: "Wisdom & Knowledge",
      icon: <Heart className="w-8 h-8 text-white" />
    },
    {
      title: "Avoiding the Wise",
      verse: "Mockers resent correction, so they avoid the wise. (Proverbs 15:12)",
      question: "Am I avoiding wise counsel or seeking it out?",
      description: "Reflect on whether you’ve sought out wisdom from others or avoided it. How can you embrace correction from those who are wiser?",
      benefits: "Seeking wisdom leads to growth.",
      category: "Wisdom & Knowledge",
      icon: <Shield className="w-8 h-8 text-white" />
    },
    {
      title: "Wisdom and Age",
      verse: "Gray hair is a crown of splendor; it is attained in the way of righteousness. (Proverbs 16:31)",
      question: "Am I honoring the wisdom that comes with age and experience?",
      description: "Reflect on your respect for wisdom, especially from older or more experienced individuals. How can you learn from their life lessons?",
      benefits: "Respecting wisdom from others helps you grow.",
      category: "Wisdom & Knowledge",
      icon: <TreeDeciduous className="w-8 h-8 text-white" />
    }
    
    // Add remaining quests following the same structure
];
const questMap = {
  'character': characterQuests,
  'conflict': conflictQuests,
  'consequences': consequenceQuests,
  'discipline': disciplineQuests,
  'family': familyQuests,
  'honesty': honestyQuests,
  'patience': patienceQuests,
  'simplicity': simplicityQuests,
  'speech': speechQuests,
};
  const currentQuests = questMap[selectedPath as keyof typeof questMap] || wisdomQuests;
  const questColors = [
    'from-amber-500 to-amber-600',
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-red-500 to-red-600',
    'from-purple-500 to-purple-600',
    'from-indigo-500 to-indigo-600',
    'from-pink-500 to-pink-600',
    'from-yellow-500 to-yellow-600',
    'from-teal-500 to-teal-600',
    'from-orange-500 to-orange-600', 
    'from-cyan-500 to-cyan-600',
    'from-lime-500 to-lime-600',
    'from-emerald-500 to-emerald-600',
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-2 sm:p-6">
      <Card className="max-w-6xl mx-auto bg-black/20 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <div className="flex flex-col space-y-4">
            <div>
              <CardTitle className="text-slate-100">Quests</CardTitle>
            </div>
            <div className="relative flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-0 z-10 hidden md:flex" 
                onClick={() => scrollCategories('left')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <ScrollArea className="w-full">
                <div ref={scrollContainerRef} className="flex gap-2 px-4 pb-4 overflow-x-auto hide-scrollbar">
                  <Button 
                    variant={selectedPath === 'character' ? "default" : "outline"}
                    onClick={() => setSelectedPath('character')}
                    className="whitespace-nowrap"
                  >
                    Character & Virtue
                  </Button>
                  <Button 
                    variant={selectedPath === 'conflict' ? "default" : "outline"}
                    onClick={() => setSelectedPath('conflict')}
                    className="whitespace-nowrap"
                  >
                    Conflict & Resolution
                  </Button>
                  <Button 
                    variant={selectedPath === 'consequences' ? "default" : "outline"}
                    onClick={() => setSelectedPath('consequences')}
                    className="whitespace-nowrap"
                  >
                    Consequences & Justice
                  </Button>
                  <Button 
                    variant={selectedPath === 'discipline' ? "default" : "outline"}
                    onClick={() => setSelectedPath('discipline')}
                    className="whitespace-nowrap"
                  >
                    Discipline & Growth
                  </Button>
                  <Button 
                    variant={selectedPath === 'family' ? "default" : "outline"}
                    onClick={() => setSelectedPath('family')}
                    className="whitespace-nowrap"
                  >
                    Family & Relationships
                  </Button>
                  <Button 
                    variant={selectedPath === 'honesty' ? "default" : "outline"}
                    onClick={() => setSelectedPath('honesty')}
                    className="whitespace-nowrap"
                  >
                    Honesty & Trust
                  </Button>
                  <Button 
                    variant={selectedPath === 'patience' ? "default" : "outline"}
                    onClick={() => setSelectedPath('patience')}
                    className="whitespace-nowrap"
                  >
                    Patience & Resilience
                  </Button>
                  <Button 
                    variant={selectedPath === 'simplicity' ? "default" : "outline"}
                    onClick={() => setSelectedPath('simplicity')}
                    className="whitespace-nowrap"
                  >
                    Simplicity & Joy
                  </Button>
                  <Button 
                    variant={selectedPath === 'speech' ? "default" : "outline"}
                    onClick={() => setSelectedPath('speech')}
                    className="whitespace-nowrap"
                  >
                    Speech & Communication
                  </Button>
                  <Button 
                    variant={selectedPath === 'wisdom' ? "default" : "outline"}
                    onClick={() => setSelectedPath('wisdom')}
                    className="whitespace-nowrap"
                  >
                    Wisdom & Knowledge
                  </Button>
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
              </ScrollArea>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 z-10 hidden md:flex" 
                onClick={() => scrollCategories('right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-6">
          <div className="relative">
            <div className={`relative grid ${
              selectedPath === 'character' 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5' 
                : selectedPath === 'conflict' 
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' 
                  : selectedPath === 'consequences'
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    : selectedPath === 'discipline'
                      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                      : selectedPath === 'family'
                        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                        : selectedPath === 'honesty'
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : selectedPath === 'patience'
                            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                            : selectedPath === 'simplicity'
                              ? 'grid-cols-1 sm:grid-cols-2'
                              : selectedPath === 'speech'
                                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
            } gap-4 items-center`}>
              {currentQuests.map((quest, index) => (
                <div key={index} className="flex justify-center py-8">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <button
                          onClick={() => setSelectedQuest(quest)}
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${questColors[index]} flex items-center justify-center transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900`}
                        >
                          {quest.icon}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[300px] p-4">
                        <div className="space-y-2">
                          <p className="font-semibold text-lg">{quest.title}</p>
                          <p className="text-sm italic">{quest.verse}</p>
                          <div className="pt-2">
                            <p className="font-medium">Question:</p>
                            <p className="text-sm">{quest.question}</p>
                          </div>
                          <div>
                            <p className="font-medium">Description:</p>
                            <p className="text-sm">{quest.description}</p>
                          </div>
                          <div>
                            <p className="font-medium">Benefits:</p>
                            <p className="text-sm">{quest.benefits}</p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Quest Details */}
          {selectedQuest && (
            <Card className="mt-6 bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-100">{selectedQuest.title}</CardTitle>
                <CardDescription className="text-slate-400">{selectedQuest.verse}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-slate-100">Daily Question</h3>
                  <p className="text-sm text-slate-400">{selectedQuest.question}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-slate-100">Description</h3>
                  <p className="text-sm text-slate-400">{selectedQuest.description}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-slate-100">Benefits</h3>
                  <p className="text-sm text-slate-400">{selectedQuest.benefits}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}