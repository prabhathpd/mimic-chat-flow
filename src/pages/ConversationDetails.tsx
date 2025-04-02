import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, FileText, MessageSquare, ArrowLeft, DownloadCloud, SparkleIcon } from "lucide-react";
import { toast } from "sonner";

// Mock data to match conversations
const mockConversationData = [
  {
    id: "CON-1234",
    user: "Alice Johnson",
    userEmail: "alice@example.com",
    message: "I'm trying to figure out how to upgrade my account to premium",
    timestamp: "Today, 14:35",
    status: "active",
    duration: "5m 23s",
    durationSeconds: 323,
    sentiment: "positive",
    platform: "Website",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording1.mp3"
  },
  {
    id: "CON-1235",
    user: "Bob Smith",
    userEmail: "bob@example.com",
    message: "The checkout process isn't working for me",
    timestamp: "Today, 13:12",
    status: "pending",
    duration: "2m 45s",
    durationSeconds: 165,
    sentiment: "negative",
    platform: "Mobile App",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording2.mp3"
  },
  {
    id: "CON-1236",
    user: "Carlos Rodriguez",
    userEmail: "carlos@example.com",
    message: "Thanks for the quick response to my query",
    timestamp: "Today, 11:50",
    status: "completed",
    duration: "3m 18s",
    durationSeconds: 198,
    sentiment: "positive",
    platform: "Website",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording3.mp3"
  },
  {
    id: "CON-1237",
    user: "Diana Chen",
    userEmail: "diana@example.com",
    message: "I need to change my delivery address for order #5432",
    timestamp: "Today, 10:27",
    status: "active",
    duration: "8m 12s",
    durationSeconds: 492,
    sentiment: "neutral",
    platform: "Website",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording4.mp3"
  },
  {
    id: "CON-1238",
    user: "Ethan Brown",
    userEmail: "ethan@example.com",
    message: "Where can I find the warranty information?",
    timestamp: "Yesterday, 16:45",
    status: "completed",
    duration: "1m 55s",
    durationSeconds: 115,
    sentiment: "neutral",
    platform: "Facebook",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording5.mp3"
  },
  {
    id: "CON-1239",
    user: "Fiona Wallace",
    userEmail: "fiona@example.com",
    message: "My product arrived damaged, I need a replacement",
    timestamp: "Yesterday, 14:22",
    status: "pending",
    duration: "10m 05s",
    durationSeconds: 605,
    sentiment: "negative",
    platform: "Instagram",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording6.mp3"
  },
  {
    id: "CON-1240",
    user: "George Patel",
    userEmail: "george@example.com",
    message: "Can I get a discount for bulk ordering?",
    timestamp: "Yesterday, 11:15",
    status: "completed",
    duration: "4m 38s",
    durationSeconds: 278,
    sentiment: "positive",
    platform: "Website",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording7.mp3"
  },
  {
    id: "CON-1241",
    user: "Hannah Kim",
    userEmail: "hannah@example.com",
    message: "When will the new model be available?",
    timestamp: "2 days ago, 15:30",
    status: "completed",
    duration: "2m 20s",
    durationSeconds: 140,
    sentiment: "neutral",
    platform: "Mobile App",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording8.mp3"
  }
];

// Mock transcript data
const mockTranscript = `
Agent: Hello, this is Alex from Sales Dashboard. How are you doing today?

Prospect: I'm doing fine, thanks for asking. What's this call about?

Agent: I'm calling to introduce you to our new analytics platform that helps sales teams track and improve their performance. Based on your company profile, I thought this might be something you're interested in.

Prospect: Actually, we are looking to improve our sales analytics. What makes your platform different?

Agent: Great question! Our platform integrates with your existing CRM and provides real-time insights with AI-powered recommendations. We've seen customers improve their conversion rates by 27% on average within the first three months.

Prospect: That sounds promising. Do you have a demo I could see?

Agent: Absolutely! I'd be happy to schedule a demo for you. Would later this week work for you?

Prospect: Yes, Thursday afternoon would be ideal.

Agent: Perfect! I'll send you a calendar invite for Thursday at 2 PM. Is there anyone else from your team who should join?

Prospect: Yes, I'll include our head of sales in the meeting.

Agent: Sounds good. I'll send over some materials ahead of time so you can get a better idea of what we'll cover. Thank you for your time today!

Prospect: Thank you, looking forward to the demo.
`;

const ConversationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState<any>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [activeTab, setActiveTab] = useState("recording");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Timer reference for audio playback simulation
  const audioIntervalRef = useRef<number | null>(null);

  // Find the conversation by ID
  useEffect(() => {
    const foundConversation = mockConversationData.find(c => c.id === id);
    if (foundConversation) {
      setConversation(foundConversation);
      if (foundConversation.durationSeconds) {
        setAudioDuration(foundConversation.durationSeconds);
      }
    }
  }, [id]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlayPause = () => {
    setIsPlayingRecording(!isPlayingRecording);
    
    // Simulate audio playback
    if (isPlayingRecording) {
      // Pause logic
      if (audioIntervalRef.current !== null) {
        window.clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
    } else {
      // Play logic - simulating audio playback
      audioIntervalRef.current = window.setInterval(() => {
        setCurrentAudioTime((prev) => {
          if (prev >= audioDuration) {
            if (audioIntervalRef.current !== null) {
              window.clearInterval(audioIntervalRef.current);
              audioIntervalRef.current = null;
            }
            setIsPlayingRecording(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };
  
  const handleAudioSeek = (value: number[]) => {
    setCurrentAudioTime(value[0]);
    // In a real implementation, this would seek the audio to the specified time
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (audioIntervalRef.current !== null) {
        window.clearInterval(audioIntervalRef.current);
      }
    };
  }, []);

  const handleDownloadRecording = () => {
    // In a real app, this would download the recording
    toast.success(`Downloading recording for conversation ${id}`);
  };

  const handleDownloadTranscript = () => {
    // In a real app, this would download the transcript
    toast.success(`Downloading transcript for conversation ${id}`);
  };

  const handleGenerateSummary = () => {
    setIsGeneratingSummary(true);
    
    // Simulate API call to generate summary
    setTimeout(() => {
      setSummary("The customer was interested in the analytics platform and its integration with their CRM. They asked about what makes the platform different and were impressed by the 27% average improvement in conversion rates. A demo was scheduled for Thursday at 2 PM, and the customer will include their head of sales in the meeting.");
      setIsGeneratingSummary(false);
      toast.success("Summary generated successfully");
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case "positive": return "bg-green-100 text-green-800";
      case "negative": return "bg-red-100 text-red-800";
      case "neutral": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!conversation) {
    return (
      <div className="py-6 px-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <Card>
          <CardContent className="py-10">
            <div className="text-center">Conversation not found</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-6 px-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Conversation Details</h1>
        </div>
        <div>
          <Button onClick={handleDownloadRecording} variant="outline" className="mr-2">
            <DownloadCloud size={16} className="mr-2" />
            Download Recording
          </Button>
          <Button onClick={handleDownloadTranscript} variant="outline">
            <FileText size={16} className="mr-2" />
            Download Transcript
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>{conversation.id}: {conversation.user}</CardTitle>
              <CardDescription>{conversation.userEmail} • {conversation.timestamp}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(conversation.status)}>
                {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
              </Badge>
              <Badge className={getSentimentColor(conversation.sentiment)}>
                {conversation.sentiment.charAt(0).toUpperCase() + conversation.sentiment.slice(1)}
              </Badge>
              <Badge variant="outline">{conversation.platform}</Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <p className="text-gray-600">{conversation.message}</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="recording">
                <MessageSquare size={16} className="mr-2" />
                Recording
              </TabsTrigger>
              <TabsTrigger value="transcript">
                <FileText size={16} className="mr-2" />
                Transcript
              </TabsTrigger>
              {summary && (
                <TabsTrigger value="summary">
                  <SparkleIcon size={16} className="mr-2" />
                  Summary
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="recording" className="space-y-4">
              {conversation.hasRecording ? (
                <div className="bg-gray-50 rounded-md p-6">
                  <audio ref={audioRef} className="hidden">
                    <source src={conversation.recordingUrl} type="audio/mp3" />
                  </audio>
                  
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentAudioTime(Math.max(0, currentAudioTime - 10))}
                      disabled={currentAudioTime <= 0}
                    >
                      <SkipBack size={16} />
                    </Button>
                    
                    <Button 
                      className={`h-14 w-14 rounded-full ${isPlayingRecording ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                      onClick={togglePlayPause}
                    >
                      {isPlayingRecording ? <Pause size={22} /> : <Play size={22} />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentAudioTime(Math.min(audioDuration, currentAudioTime + 10))}
                      disabled={currentAudioTime >= audioDuration}
                    >
                      <SkipForward size={16} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{formatTime(currentAudioTime)}</span>
                      <span>{formatTime(audioDuration)}</span>
                    </div>
                    <Slider
                      value={[currentAudioTime]}
                      max={audioDuration}
                      step={1}
                      onValueChange={handleAudioSeek}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-md p-6 text-center">
                  <p>No recording available for this conversation.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="transcript">
              {conversation.hasTranscript ? (
                <div className="bg-gray-50 rounded-md p-6">
                  <div className="whitespace-pre-wrap font-mono text-sm">
                    {mockTranscript}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-md p-6 text-center">
                  <p>No transcript available for this conversation.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="summary">
              <div className="bg-gray-50 rounded-md p-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium mb-2">Call Summary</h3>
                  <p>{summary}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Duration:</span> {conversation.duration}
          </div>
          
          {!summary && (
            <Button 
              onClick={handleGenerateSummary} 
              disabled={isGeneratingSummary}
              className="ml-auto"
            >
              <SparkleIcon size={16} className="mr-2" />
              {isGeneratingSummary ? "Generating..." : "Generate Summary"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConversationDetails;
